import ts from 'typescript'
import type { PluginOptions } from 'vite-plugin-dts'

const vueModules = new Set(['vue', 'vue-demi'])

/** Emit the shared Vue 2.7/3 type surface, retaining inferred scoped slots. */
export function normalizeChartDeclarations(content: string, filePath: string): string {
  const source = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )
  const vueNames = new Map<string, string>()
  for (const statement of source.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      vueModules.has(statement.moduleSpecifier.text)
    ) {
      const bindings = statement.importClause?.namedBindings
      if (bindings && ts.isNamedImports(bindings)) {
        for (const specifier of bindings.elements) {
          vueNames.set(specifier.name.text, specifier.propertyName?.text ?? specifier.name.text)
        }
      }
    }
  }
  const nameOf = (node: ts.Node): string | undefined => {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
      return vueNames.get(node.typeName.text)
    }
    if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal) &&
      vueModules.has(node.argument.literal.text) &&
      node.qualifier &&
      ts.isIdentifier(node.qualifier)
    )
      return node.qualifier.text
    return undefined
  }
  const handledSlots = new Set<ts.Node>()
  const transformed = ts.transform(source, [
    context => {
      const { factory } = context
      const updateArgs = (
        node: ts.TypeReferenceNode | ts.ImportTypeNode,
        args: readonly ts.TypeNode[],
      ) =>
        ts.isTypeReferenceNode(node)
          ? factory.updateTypeReferenceNode(node, node.typeName, factory.createNodeArray(args))
          : factory.updateImportTypeNode(
              node,
              node.argument,
              node.attributes,
              node.qualifier,
              factory.createNodeArray(args),
              node.isTypeOf,
            )
      const visit: ts.Visitor = node => {
        if (ts.isTypeReferenceNode(node) || ts.isImportTypeNode(node)) {
          let args = node.typeArguments ? [...node.typeArguments] : []
          const referenceName = ts.isTypeReferenceNode(node)
            ? ts.isIdentifier(node.typeName)
              ? node.typeName.text
              : undefined
            : node.qualifier && ts.isIdentifier(node.qualifier)
              ? node.qualifier.text
              : undefined
          if (referenceName === 'ChartComponent' && args.length >= 2) {
            const component = args[1]!
            if (
              (ts.isImportTypeNode(component) || ts.isTypeReferenceNode(component)) &&
              nameOf(component) === 'DefineComponent'
            ) {
              const slots = component.typeArguments?.[12]
              if (slots && !(ts.isTypeLiteralNode(slots) && slots.members.length === 0)) {
                if (
                  (ts.isImportTypeNode(slots) || ts.isTypeReferenceNode(slots)) &&
                  nameOf(slots) === 'SlotsType' &&
                  slots.typeArguments?.length === 1
                ) {
                  if (args.length === 2 || args[2]?.kind === ts.SyntaxKind.NeverKeyword) {
                    args[2] = slots.typeArguments[0]!
                  }
                  handledSlots.add(component)
                } else {
                  throw new Error(`Unsupported inferred slot declaration in ${filePath}`)
                }
              }
            }
          }
          const vueName = nameOf(node)
          if (vueName === 'DefineComponent' && args.length > 11) {
            const slots = args[12]
            if (
              slots &&
              !(ts.isTypeLiteralNode(slots) && slots.members.length === 0) &&
              !handledSlots.has(node)
            ) {
              throw new Error(`Wrap components with inferred slots in withChartProps: ${filePath}`)
            }
            // The first nine parameters have the same meaning in Vue 2.7 and 3.
            // Later parameters differ by version. Each consumer supplies its defaults.
            args = args.slice(0, 9)
            // A setup render function contributes no named instance bindings.
            // Keeping its inferred VNode renderer types would leak Vue 3 internals.
            if (
              args[1] &&
              (ts.isFunctionTypeNode(args[1]) || nameOf(args[1]) === 'RenderFunction')
            ) {
              args[1] = factory.createTypeLiteralNode([])
            }
          } else if (vueName === 'VNode' && args.length) {
            args = []
          } else if ((vueName === 'Ref' || vueName === 'ShallowRef') && args.length > 1) {
            args = args.slice(0, 1)
          }
          node = updateArgs(node, args)
        }
        if (
          ts.isImportTypeNode(node) &&
          ts.isLiteralTypeNode(node.argument) &&
          ts.isStringLiteral(node.argument.literal) &&
          node.argument.literal.text === 'vue'
        ) {
          node = factory.updateImportTypeNode(
            node,
            factory.createLiteralTypeNode(factory.createStringLiteral('vue-demi')),
            node.attributes,
            node.qualifier,
            node.typeArguments,
            node.isTypeOf,
          )
        } else if (
          ts.isImportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier) &&
          node.moduleSpecifier.text === 'vue'
        ) {
          node = factory.updateImportDeclaration(
            node,
            node.modifiers,
            node.importClause,
            factory.createStringLiteral('vue-demi'),
            node.attributes,
          )
        }
        return ts.visitEachChild(node, visit, context)
      }
      return node => ts.visitNode(node, visit) as ts.SourceFile
    },
  ])
  try {
    const output = transformed.transformed[0]!
    // Normalization can remove Vue-3-only parameters and their type imports.
    const used = new Set<string>()
    const collect = (node: ts.Node) => {
      if (ts.isImportDeclaration(node)) return
      if (ts.isIdentifier(node)) used.add(node.text)
      ts.forEachChild(node, collect)
    }
    collect(output)
    const statements = output.statements.flatMap(statement => {
      if (
        ts.isImportDeclaration(statement) &&
        ts.isStringLiteral(statement.moduleSpecifier) &&
        vueModules.has(statement.moduleSpecifier.text)
      ) {
        const clause = statement.importClause
        const bindings = clause?.namedBindings
        if (bindings && ts.isNamedImports(bindings)) {
          const elements = bindings.elements.filter(specifier => used.has(specifier.name.text))
          if (!elements.length && !clause?.name) return []
          return [
            ts.factory.updateImportDeclaration(
              statement,
              statement.modifiers,
              ts.factory.updateImportClause(
                clause!,
                clause!.isTypeOnly,
                clause!.name,
                ts.factory.updateNamedImports(bindings, elements),
              ),
              statement.moduleSpecifier,
              statement.attributes,
            ),
          ]
        }
      }
      return [statement]
    })
    return ts.createPrinter().printFile(ts.factory.updateSourceFile(output, statements))
  } finally {
    transformed.dispose()
  }
}

export function chartDeclarations(tsconfigPath: string): PluginOptions {
  return {
    tsconfigPath,
    beforeWriteFile(filePath, content) {
      return { filePath, content: normalizeChartDeclarations(content, filePath) }
    },
  }
}

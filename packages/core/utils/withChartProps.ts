import type { VNode } from 'vue-demi'

type ComponentConstructor = new (...args: any[]) => { $props: object }

type SlotFunctions<Slots> = {
  [Name in keyof Slots]: NonNullable<Slots[Name]> extends (...args: any[]) => any
    ? NonNullable<Slots[Name]>
    : (props: Slots[Name]) => VNode[]
}

type ChartInstance<Props, Component extends ComponentConstructor, Slots> = [Slots] extends [never]
  ? InstanceType<Component> & { $props: Readonly<Props> }
  : Omit<InstanceType<Component>, '$props' | '$slots' | '$scopedSlots'> & {
      $props: InstanceType<Component>['$props'] & Readonly<Props>
    } & (InstanceType<Component> extends { $scopedSlots: object }
        ? {
            $slots: { [Name in keyof Slots]: VNode[] | undefined }
            $scopedSlots: SlotFunctions<Slots>
          }
        : { $slots: SlotFunctions<Slots> })

export type ChartComponent<
  Props,
  Component extends ComponentConstructor,
  Slots = never,
> = Component & {
  new (...args: ConstructorParameters<Component>): ChartInstance<Props, Component, Slots>
}

// Charts accept configuration through attrs as well as runtime props. Add that
// public contract while retaining the component's inferred events, slots and API.
// Currying lets callers supply Props while Component remains inferred. The build
// carries inferred slot contracts separately because Vue 2.7 and 3 encode them
// differently in DefineComponent and expose them on different instance members.
export function withChartProps<Props>() {
  return <Component extends ComponentConstructor>(
    component: Component,
  ): ChartComponent<Props, Component> => component as ChartComponent<Props, Component>
}

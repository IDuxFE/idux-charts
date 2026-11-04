// pnpm 10.0-10.25 uses onlyBuiltDependencies; newer versions use allowBuilds in pnpm-workspace.yaml.
module.exports = {
  hooks: {
    updateConfig(config) {
      const match = (config.userAgent || process.env.npm_config_user_agent || '').match(
        /pnpm\/(\d+)\.(\d+)/,
      )
      const major = match ? Number(match[1]) : 0
      const minor = match ? Number(match[2]) : 0
      if (major === 10 && minor < 26) {
        config.onlyBuiltDependencies = ['esbuild', 'vue-demi']
      }
      return config
    },
  },
}

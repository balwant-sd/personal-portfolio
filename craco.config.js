// Tweaks to Create React App's webpack config, applied by CRACO.

// Hostinger shares one process limit across every site on the account, and it
// counts threads too. CRA's minifiers default to one worker per CPU core (minus
// one), so cap them at 2 to keep builds from spiking that shared limit.
const MINIFIER_WORKERS = 2

const CAPPED_PLUGINS = ['TerserPlugin', 'CssMinimizerPlugin']

module.exports = {
  webpack: {
    configure: (config, { env }) => {
      if (env !== 'production') return config

      for (const plugin of config.optimization.minimizer) {
        const name = plugin.constructor.name
        if (CAPPED_PLUGINS.includes(name)) {
          plugin.options.parallel = MINIFIER_WORKERS
          console.log(`[craco] ${name}: parallel workers capped at ${MINIFIER_WORKERS}`)
        }
      }
      return config
    },
  },
}

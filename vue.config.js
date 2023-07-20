const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/_variables.scss')],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/styles/_variables.scss";`
      }
    }
  }
})

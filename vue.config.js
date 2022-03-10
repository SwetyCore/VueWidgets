module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: "./",
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false,
}

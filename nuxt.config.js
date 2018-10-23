const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /* Headers of the page */
  head: {
    title: 'Password Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      {
        name: 'keywords',
        content:
          'パスワード生成,パスワード自動生成,パスワード作成,パスワード自動作成'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /* Customize the progress-bar color */
  loading: { color: '#fff' },

  /*  Global CSS */
  css: ['~/assets/style/app.styl'],

  /* Plugins to load before mounting the App */
  plugins: ['@/plugins/vuetify'],

  /* Nuxt.js modules */
  modules: ['nuxt-clipboard2'],

  /* Build configuration */
  build: {
    /* You can extend webpack config here */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
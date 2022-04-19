/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  ssr: false,
  target: 'static',
  head: {
    title: 'kanban-electron',
    meta: [{ charset: "utf-8" }]
  },
  loading: false,
  plugins: [
    '@/plugins/directives.js'
  ],

  buildModules: [
    '@nuxt/postcss8'
  ],

  modules: [
    '@nuxtjs/toast',
  ],

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  css: [
    '@/assets/css/main.css',
  ],

};

<template lang="pug">
  v-app
    v-toolbar(app dark color="primary")
      nuxt-link.d-flex(to="/")
        img(src="/logo.svg" alt="logo" height="30px" width="30px" aria-hidden="true")
      v-toolbar-title Password Generator
    v-content
      v-container(grid-list-lg)
        nuxt
    v-footer
      v-spacer
      .footer-item &copy;
      .footer-item 2018
      .footer-item: a(href="https://www.tes.co.jp/" target="_blank") Technical Engineering Support Inc.
      v-spacer
</template>

<style lang="stylus" scoped>
.footer-item:not(:last-child)
  display inline
  margin-right .5em
</style>

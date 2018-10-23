<template lang="pug">
  v-card(v-if="results.length > 0")
    v-subheader 生成結果
    v-slide-y-transition(group hide-on-leave tag="v-card-text")
      div(v-for="result in results" :key="result")
        v-text-field(type="text" :value="result" readonly prepend-icon="content_copy" @click="select($event)" @click:prepend="copy(result)")

    v-snackbar(v-model="copied" bottom) クリップボードにコピーしました
      v-btn(color="primary" flat @click="copied = false") Close
</template>

<script>
export default {
  data() {
    return {
      copied: false
    }
  },
  computed: {
    results() {
      return this.$store.state.passwords
    }
  },
  methods: {
    select($event) {
      $event.target.focus()
      $event.target.select()
    },
    async copy(result) {
      try {
        await this.$copyText(result)
        this.copied = true
      } catch (e) {
        console.error(e)
        alert('クリップボードにコピーできませんでした')
      }
    }
  }
}
</script>

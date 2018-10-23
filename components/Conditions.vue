<template lang="pug">
  v-card
    v-subheader 生成条件
    v-card-text
      v-form
        v-radio-group(v-model="strength" row)
          v-radio(label="普通" value="normal")
          v-radio(label="強い" value="strong")
          v-radio(label="カスタム" value="custom")

        slider(label="桁数" v-model="total" :min="4" :max="64" :disabled="!isCustom")
        slider(label="数字の数" v-model="digits" :min="0" :max="10" :disabled="!isCustom")
        slider(label="記号の数" v-model="symbols" :min="0" :max="10" :disabled="!isCustom")
        slider(label="生成する個数" v-model="generates" :min="1" :max="50")

    v-card-actions
      v-btn(:loading="generating" :disabled="generating" block color="primary" @click="submit") 生成する
</template>

<script>
import Slider from '~/components/Slider.vue'

export default {
  components: {
    Slider
  },
  data: () => ({
    strength: 'normal',
    total: 4,
    digits: 0,
    symbols: 0,
    generates: 5
  }),
  computed: {
    generating() {
      return this.$store.state.generating
    },
    isCustom() {
      return this.strength === 'custom'
    }
  },
  watch: {
    strength() {
      this.setPreset()
    }
  },
  mounted: function() {
    this.strength = 'normal'
  },
  methods: {
    setPreset() {
      switch (this.strength) {
        case 'normal':
          this.total = 12
          this.digits = 4
          this.symbols = 0
          break
        case 'strong':
          this.total = 24
          this.digits = 5
          this.symbols = 5
          break
      }
    },
    async submit() {
      await this.$store.dispatch('generate', {
        total: this.total,
        digits: this.digits,
        symbols: this.symbols,
        generates: this.generates
      })
    }
  }
}
</script>

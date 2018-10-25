<template lang="pug">
  v-card
    v-subheader 生成条件
    v-card-text
      v-form(ref="form" v-model="valid" lazy-validation)
        v-radio-group(v-model="strength" row)
          v-radio(label="普通" value="normal")
          v-radio(label="強い" value="strong")
          v-radio(label="カスタム" value="custom")

        slider(label="桁数" v-model="total" min="4" max="64" :disabled="!isCustom" :rules="rules.total")
        slider(label="数字の数" v-model="digits" min="0" max="10" :disabled="!isCustom")
        slider(label="記号の数" v-model="symbols" min="0" max="10" :disabled="!isCustom")
        slider(label="生成する数" v-model="generates" min="1" max="50")

    v-card-actions
      v-btn(:loading="generating" :disabled="!valid || generating" block color="primary" @click="submit") 生成する
</template>

<script>
import Slider from '~/components/Slider.vue'

export default {
  components: {
    Slider
  },
  data() {
    return {
      valid: true,
      strength: null,
      total: 4,
      digits: 0,
      symbols: 0,
      generates: 5,
      rules: {
        total: [
          v =>
            v >= this.dynamicTotalMin ||
            '数字と記号を合わせた桁数を下回っています'
        ]
      }
    }
  },
  computed: {
    generating() {
      return this.$store.state.generating
    },
    isCustom() {
      return this.strength === 'custom'
    },
    dynamicTotalMin() {
      return Number(this.digits) + Number(this.symbols)
    }
  },
  watch: {
    strength() {
      this.setPreset()
    },
    digits() {
      this.adjustLength()
    },
    symbols() {
      this.adjustLength()
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
    adjustLength() {
      // 数字・記号の桁数が変わったら、合計の桁数の帳尻を合わせる
      if (this.total < this.dynamicTotalMin) {
        this.total = this.dynamicTotalMin
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

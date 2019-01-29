<template lang="pug">
  v-card
    v-subheader 生成条件
    v-card-text
      v-form
        v-radio-group(v-model="strength" row)
          v-radio(label="普通" value="normal")
          v-radio(label="強い" value="strong")
          v-radio(label="カスタム" value="custom")

        slider(label="桁数" v-model="total" :min="dynamicTotalMin" max="64" :disabled="!isCustom")
        slider(label="数字の数" v-model="digits" min="0" max="10" :disabled="!isCustom")
        slider(label="記号の数" v-model="symbols" min="0" max="10" :disabled="!isCustom || symbolChars.length === 0")
        template(v-if="isCustom")
          v-select.ml-5(label="対象の記号" v-model="symbolChars" :items="SYMBOL_CHARS" chips multiple)
            template(slot="selection" slot-scope="{ item, index }")
              v-chip(v-if="index < SYMBOL_VIEW_COUNT") {{ item }}
              span.grey--text.caption.ml-2(v-if="index === SYMBOL_VIEW_COUNT") (+{{ symbolChars.length - SYMBOL_VIEW_COUNT }} others)
        slider(label="生成する数" v-model="generates" min="1" max="50")

    v-card-actions
      v-btn(:loading="generating" :disabled="generating" block color="primary" @click="submit") 生成する
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Slider from '~/components/Slider.vue'

export default {
  components: {
    Slider
  },
  computed: {
    ...mapGetters(['generating']),
    ...mapGetters('conditions', ['isCustom', 'SYMBOL_CHARS']),
    strength: {
      get() {
        return this.$store.state.conditions.strength
      },
      set(value) {
        const name = 'strength'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    total: {
      get() {
        return this.$store.state.conditions.total
      },
      set(value) {
        const name = 'total'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    digits: {
      get() {
        return this.$store.state.conditions.digits
      },
      set(value) {
        const name = 'digits'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    symbols: {
      get() {
        return this.$store.state.conditions.symbols
      },
      set(value) {
        const name = 'symbols'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    generates: {
      get() {
        return this.$store.state.conditions.generates
      },
      set(value) {
        const name = 'generates'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    symbolChars: {
      get() {
        return this.$store.state.conditions.symbolChars
      },
      set(value) {
        const name = 'symbolChars'
        this.$store.commit('conditions/update', { name, value })
      }
    },
    dynamicTotalMin() {
      const v = Number(this.digits) + Number(this.symbols)
      return v < 4 ? 4 : v
    },
    SYMBOL_VIEW_COUNT: () => 3
  },
  watch: {
    strength() {
      this.setPreset()
    },
    symbolChars(newValue) {
      if (newValue.length === 0) {
        this.symbols = 0
      }
    }
  },
  mounted: function() {
    this.initialize()
  },
  methods: {
    ...mapActions('conditions', ['initialize', 'setPreset']),
    async submit() {
      await this.$store.dispatch('generate', {
        total: this.total,
        digits: this.digits,
        symbols: this.symbols,
        generates: this.generates,
        symbolChars: this.isCustom ? this.symbolChars : this.SYMBOL_CHARS
      })
    }
  }
}
</script>

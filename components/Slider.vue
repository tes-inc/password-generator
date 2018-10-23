<template lang="pug">
  v-layout
    v-flex.mr-1.number-field
      v-text-field(type="number" v-model="internalValue" :min="min" :max="max" :label="label" :disabled="disabled")
    v-flex
      v-slider(v-model="internalValue" :min="min" :max="max" :disabled="disabled")
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    max: {
      type: [Number, String],
      required: true
    },
    min: {
      type: [Number, String],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.value
      },
      set(newValue) {
        if (this.value !== newValue) {
          this.$emit('input', newValue)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.number-field
  max-width 12em
  min-width 8em
</style>

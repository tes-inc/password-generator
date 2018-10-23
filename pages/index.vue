<template lang="pug">
  v-layout(column)
    v-flex
      conditions
    v-flex
      results
</template>

<script>
import Conditions from '~/components/Conditions.vue'
import Results from '~/components/Results.vue'

export default {
  components: {
    Conditions,
    Results
  }
}
</script>

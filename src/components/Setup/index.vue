<!--  -->
<template>
  <div>
    setup
    {{ fath }}
    <!-- <button @click="count += 1">{{ count }}</button>
  <span @click="refcount += 2">refcount+2:{{ refcount }}</span> -->
  </div>
</template>

<script>
import {
  reactive,
  ref
} from '@vue/composition-api'
export default {
  data () {
    return {}
  },
  props: {
    fath: String,
  },
  /* setup(fath, ctx) {
    console.log(ctx)
    const state = reactive({
      count: 0,
    })
    const refcount = ref(9)
    return {
      state,
      refcount,
    }
  }, */
  components: {},
}
</script>

<style lang="scss" scoped></style>

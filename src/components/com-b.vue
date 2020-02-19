<template>
<div class='container-com-b'>
  B组件的值：<button @click="fn">传给A的值</button>
</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'app-com-b',
  data () {
    return {
      str: '我是B组件的值'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.str)
    }
  }
}
</script>

<style scoped lang='less'></style>

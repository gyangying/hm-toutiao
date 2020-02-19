<template>
<div class='container-com-a'>
  A组件的值：{{msg}}
</div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  name: 'app-com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style scoped lang='less'></style>

<template>
  <el-select
   :value="value"
   @change="changeChannel"
   clearable
   placeholder="请选择">
    <el-option
     v-for="item in channelOptions"
     :key="item.id"
     :label="item.name"
     :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    changeChannel (value) {
      if (value === '') value = null
      this.$emit('input', value)
    },
    // async getChannelOptions () {
    //   const res = await this.$http.get('channels')
    //   this.channelOptions = res.data.data.channels
    // },
    async getChannelOptions () {
      const res = await this.$http.get('channels')
      this.channelOptions = res.data.data.channels
    }
  }
}
</script>

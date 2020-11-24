<template>
  <div>
    <p v-if="list.length === 0">暂无数据</p>

    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </div>
</template>
<script>
import JRTC from '../api/JRTC'
import md5 from 'js-md5'
export default {
  name: 'about',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {}
  },
  async created() {
    const { peerId } = await JRTC.init(
      '192bc3400174019265a7b1ad1ea7c6c7',
      'NGVTSUUwYlBIdTV5TnZweWVvaTZWaXFEdUNKU1lnVmhtYmdUVUkrUlB1WT0_',
      md5('husan'),
      'husan',
      111,
      new Date(2199, 1, 1).getTime(),
      true,
      true
    )

    const roomObj = await JRTC.enterRoom({
      roomId: 2235,
      peerId,
      nickName: 'husan',
      subscribeType: 1
    }).catch(err => {
      console.log(err)
    })
    console.log(roomObj)
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.Json {
  width: 800px;
  height: 300px;
}
</style>

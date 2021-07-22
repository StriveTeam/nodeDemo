<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="A"></el-tab-pane>
    <el-tab-pane label="配置管理" name="B"></el-tab-pane>
    <el-tab-pane label="角色管理" name="C"></el-tab-pane>
    <component v-bind:is="currentTabComponent"></component>
  </el-tabs>
</template>
<script>
import A from './Login.vue'
import B from './Home.vue'
import C from './About.vue'

export default {
  name: 'TabsTest',
  components: { A, B, C },
  data() {
    return {
      activeName: 'A',
      currentTabComponent: B
    }
  },
  methods: {
    handleClick(tab, event) {
      this.currentTabComponent = tab
    }
  }
}
</script>

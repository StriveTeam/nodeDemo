<template>
  <div id="app">
    <el-container v-if="login" class="mainCon">
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <el-container v-else class="mainCon" style="background: #f5f5f5">
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      login: false
    }
  },
  watch: {
    $route() {
      const routName = this.$route.name
      console.log(routName)
      if (routName === 'login') {
        this.login = false
      } else {
        this.login = true
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  // line-height: 160px;
  height: 100%;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.mainCon {
  height: 100%;
}
body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
</style>

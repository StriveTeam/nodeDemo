<template>
  <div style="width:800px">
    <el-table :data="tableData" border row-key="id" align="left">
      <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import Sortable from "sortablejs";
// import { saveAs } from "file-saver";
var FileSaver = require('file-saver')
// @ is an alias to /src
export default {
  name: 'home',
  data() {
    return {}
  },
  created() {
    FileSaver.saveAs('https://static2.jdcloud.com/Ynavi.js', 'aa.js')
  }
}
</script>

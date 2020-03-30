<template>
  <div class="jsonParse">
    <div class="jsonBox">
      <div class="source el-textarea">
        <div class="textRows">
          <div v-for="(item, index) in textRows" :key="index">{{item}}</div>
        </div>
        <textarea autocomplete="off" class="el-textarea__inner" v-model="source" @change="checkJson"></textarea>
      </div>
    </div>
    <div class="resultBox">
      <pre id="result" class="res el-textarea__inner" :class="{'result': checkFlag === 1,'pass': checkFlag === 2, 'fail': checkFlag === 3}" >{{result}}</pre>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import jsonlint from '@/libs/jsonlint'
// import '@/libs/json2';
import _ from 'lodash'
export default {
  name: 'jsonparse',
  props: {
    jsonshow: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      source: '',
      result: '',
      checkFlag: 1,
      textRows: []
    }
  },
  created() {},
  methods: {
    checkJson() {
      try {
        const checkFlagText = jsonlint.parse(this.source)
        if (checkFlagText) {
          this.source = JSON.stringify(checkFlagText, null, '  ')
          document.getElementById('result').innerHTML = 'Json is valid!'
          this.checkFlag = 2
        }
      } catch (e) {
        this.checkFlag = 3
        document.getElementById('result').innerHTML = e
        // this.result = e;
      }
    }
  },
  mounted() {},
  watch: {
    source: _.debounce(function() {
      if (this.source === '') {
        this.checkFlag = 1
        document.getElementById('result').innerHTML = ''
      } else {
        this.checkJson()
      }
    }, 600),
    jsonshow(val) {
      if (val === true) {
        this.source = ''
        this.checkFlag = 1
        document.getElementById('result').innerHTML = '' // console.log(document.getElementById('#result').innerText)
      }
    }
  }
}
</script>
<style lang="scss">
.jsonParse {
  line-height: 30px;
  .jsonBox,
  .resultBox {
    padding: 10px 20px;
  }
  .source {
    .el-textarea__inner {
      height: 400px;
    }
  }
  .res {
    height: 90px;
    border: 1px solid #ddd;
    /*display: none;*/
  }
  .pass {
    height: 90px;
    color: #42b941;
    background: #ddfbdd;
    border: 1px solid #258625;
    display: block;
  }
  .fail {
    height: 90px;
    color: #930;
    border: 1px solid #c50606;
    display: block;
  }
}
textarea {
  width: 100%;
}
</style>

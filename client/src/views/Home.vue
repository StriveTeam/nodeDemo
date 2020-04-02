<template>
  <div style="width:800px">
    <ul>
      <li @click="aa">sdasdasd</li>
    </ul>
    <input type="file" id="file" name="file" multiple />
    <br />

    <li v-for="(item, index) in dataList" :key="index">
      <video ref="videoPlayer" :autoplay="true" controls controlslist="nodownload" class="video-js">
        <source :src="item.content" type="video/mp4" />
      </video>
    </li>
  </div>
</template>
<script>
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
/**
 * 1. npm install jszip
 * 2. npm install  jQuery --save-dev
 * 3. 配置vue.config.js
   configureWebpack: {
    externals: {
      '$': 'jQuery ',
      'jQuery ': 'jQuery '
    }
  },
  * 4. var JSZip = require("jszip");
 */
/* eslint-disable */
var JSZip = require('jszip');
// var JS_Zip = new JSZip();
// @ is an alias to /src
export default {
  name: 'home',
  data() {
    return {
      url: '',
      dataList: [],
      player: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          fullscreenToggle: false,
          pictureInPictureToggle: false,
          playToggle: false
        },
        sources: []
      }
    };
  },
  created() {},
  methods: {
    aa() {
      history.pushState({ type: 1 }, 'page 2', 'http://localhost:8080/#/about');
      console.log(history);
      // history.replaceState(
      //   history.state,
      //   'sa',
      //   'http://localhost:8080/#/about'
      // );
      // console.log(window.history.length);
      // history.go(-1);
      this.$router.replace({ path: '/about' });
    }
  },
  mounted() {
    let _this = this;
    var $result = $('#result');
    $('#file').on('change', function(evt) {
      function handleFile(f) {
        JSZip.loadAsync(f) // 1) read the Blob
          .then(function(zip) {
            console.log(zip);
            for (let key in zip.files) {
              // 判断是否是目录
              if (!zip.files[key].dir) {
                if (/\.(mp4|MP4)$/.test(zip.files[key].name)) {
                  // 判断是否是图片格式
                  let base = zip.file(zip.files[key].name).async('blob'); // 将图片转化为base64格式
                  base.then(res => {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(res);
                    reader.onload = function(e) {
                      let w = new Blob([reader.result], { type: 'video/mp4' });
                      // console.info(w); //ArrayBuffer {}
                      _this.dataList.push({
                        fileName: zip.files[key].name,
                        type: 'video',
                        content: URL.createObjectURL(w)
                      });
                      setTimeout(function() {
                        _this.player = videojs(
                          _this.$refs.videoPlayer,
                          _this.videoOptions,
                          function onPlayerReady() {
                            console.log('mounted');
                            this.src({ src: URL.createObjectURL(w) });
                            this.load();
                            this.play();
                            this.on('error', function() {
                              this.errorDisplay.close();
                            });
                            this.on('loadedmetadata', function() {});
                          }
                        );
                      }, 0);

                      //经常会遇到的异常 Uncaught RangeError: byte length of Int16Array should be a multiple of 2
                      //var buf = new int16arr
                    };
                    console.log(res);
                    // _this.dataList.push({
                    //   fileName: zip.files[key].name,
                    //   type: 'video',
                    //   content: URL.createObjectURL(res)
                    // });
                  });
                }
              }
            }
          });
      }

      var files = evt.target.files;
      console.log(files);
      for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        handleFile(files[i]);
      }
    });
  }
};
</script>
<style lang="scss">
.operate {
  span {
    color: #1ba2f5;
    cursor: pointer;
  }
}
</style>
>

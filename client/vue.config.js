const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};
console.log(process.env.VUE_APP_SECRET);
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  outputDir: 'dist',
  assetsDir: '',
  indexPath: 'index.html',
  filenameHashing: true,
  // true时eslint-loader 会将 lint 错误输出为编译警告，不会编译失败 error：输出错误，编译失败
  lintOnSave: 'error',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        secure: false,
        changeOrigin: true
        // pathRewrite: {'^/api': ''},
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'));
  },
  // 打包时不生成.map文件，如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false
};

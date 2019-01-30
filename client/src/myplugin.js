import cusComponents from './components/index';
export default {
  install (vue) {
    /** 添加自定义组件 */
    cusComponents.forEach(com => {
      vue.component(com.name, com.component);
    });
    // 复制对象数据
    vue.prototype.copy = (obj) => {
      if (!obj) {
        return null;
      } else {
        return JSON.parse(JSON.stringify(obj));
      }
    };
  }
};

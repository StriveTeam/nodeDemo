import cusComponents from './components/index';
import draggable from 'vuedraggable';
export default {
  install (vue) {
    /** 添加自定义组件 */
    vue.component('draggable', draggable);
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
    // bus
    vue.prototype.BUS = (function () {
      var events = {};
      return {
        $on (name, fn) {
          events[name] = fn;
        },
        $emit () {
          if (events[arguments[0]]) {
            var options = Array.prototype.slice.call(arguments, 1);
            events[arguments[0]].apply(null, options);
          }
        }
      };
    }());
  }
};

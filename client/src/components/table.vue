<style lang="scss">
  @import '../assets/css/abstract';
  .ctable{
    width:100%;
    background: white;
    .cell{
      display: inline-block;
      >div{
        display: inline-block;
      }
      .filter{
        position: relative;
      }
    }
    .sort{
      width:15px;
      height:40px;
      position: relative;
      margin-left:5px;
      i{
        cursor: pointer;
        border-left:6px solid transparent;
        border-right: 6px solid transparent;
        position: absolute;
        left:0;
        display: block;
      }
      i:first-child{
        &.active{
          border-bottom: 6px solid #48576a;
        }
        top:13px;
        border-bottom: 6px solid #97a8be;
      }
      i:last-child{
        bottom:13px;
        border-top: 6px solid #97a8be;
        &.active{
          border-top:6px solid #48576a;
        }
      }
    }
    table{
      width:100%;
      line-height: 40px;
      text-align: center;
      &.bill{
        background: #EDF6FD;
        th{
          background: #EDF6FD;
          border-bottom: 1px solid #C0D8F0;
          color:#4C545B;
        }
        td{
          color:#666666 ;
          border-bottom:1px solid white;
        }
      }
      &.info{
        background: #EDF6FD;
        th{
          background: #EDF6FD;
          border-bottom: 1px solid rgba(65, 155, 249, .5);
        }
        td{
          border-bottom:1px solid rgba(193, 218, 247, .5);
          &.check{
            border-bottom: none;
          }
        }
      }
      tr:last-child td{
        border-bottom: none;
      }
      &[falign=left]{
        text-align: left;
      }
      &[falign=right]{
        text-align: right;
      }
      td{
        font-size: 14px;
        line-height: 20px;
        position: relative;
        padding: 10px;
      }
      th{
        font-size: 14px;
        padding:0 10px;
        height:40px;
        i{
          transition: .3s;
        }
        .el-icon-arrow-down.active{
          transform: rotate(180deg);
        }
      }
      &.def{
        th{
          .cell{
            position: relative;
            // &:before{
            //   @include default-pseudo;
            //   width:8px;
            //   height:8px;
            //   left:-12px;
            //   top:16px;
            //   border-radius: 5px;
            //   background: #F5BB80;
            // }
            &.none{
              &:before{
                display: none;
              }
            }
          }
        }
      }
    }
    .s-body{
      overflow: auto;
      tr:nth-child(2n-1) {
        background-color: #EDF6FD;
      }
      tr:nth-child(2n) {
        background-color: $c-back;
      }
      tr{
        transition: .3s;
        .hover{
          visibility: hidden;
        }
      }
      tr:hover{
        background-color:#dfe6ec;
        .hover{
          visibility: visible;
        }
      }
      td.disabled{
        color:#999999;
      }
      td.abated{
        color:#DF5D5D;
      }
      td.gray{
        color:#807d7d;
      }
      td.disuse{
        color:#b8b5b5 !important;
      }
      td.disuse div.cell{
         text-decoration:line-through;
      }
      td .handle{
        color:#479CF3;
        margin-right:10px;
        cursor:pointer;
      }
      td.red{
         color:#DF5D5D;
      }
      td .bingdelete{
        color:#479CF3;
        cursor:pointer;
      }
      td .tdelete{
        color:#DF5D5D;
        cursor:pointer;
      }
    }
  }
  /*
   * 用于筛选窗口
   */
  .table-filter{
    width:200px;
    transition: .3s;
    &.component-filter{
      position: absolute;
      z-index: 11;
      background: #ffffff;
      top: 100%;
      left:0;
    };
    .search-box{
      padding:10px 0;
      width:100%;
      border-bottom:1px solid #B3CFF4;
      div{
        width:160px;
        margin:auto;
        height:30px;
        line-height: 30px;
        position: relative;
        background: #EDF6FD;
        padding-left:35px;
        border-radius: 15px;
        .search{
          position: absolute;
          width:22px;
          height:22px;
          left:7px;
          top:4px;
        }
        input{
          width:100%;
          line-height: 25px;
          background: none;
          border:none;
          font-size:14px;
          color:#8BB8F1;
        }
      }
    }
    .list{
      ul{
        text-align: left;
        max-height: 220px;
        overflow: auto;
      }
      li{
        padding-left: 20px;
        font-size: 14px;
        .el-checkbox{
          color:#3f4954;
        }
        .el-checkbox__inner{
          transform: scale(.9);
        }
        > div{
          border-bottom: 1px solid #E2ECF9;
        }
        &:last-child div{
          border:none;
        }
        &.full-select{
          .el-checkbox{
            color:$c-blue;
          }
          border-bottom: 1px solid #E2ECF9;
          padding-left:10px;
        }
        &.radio{
          cursor: pointer;
          transition: background .3s;
          position: relative;
          padding-right:10px;
          &:hover{
            background: #eef1f6;
          }
          i{
            position: absolute;
            right:7px;top:50%;
            font-size:12px;
            line-height: 12px;
            margin-top:-6px;
          }
        }
      }
      &.radio{
        li{
          border: none;
          border-bottom: 1px solid #E2ECF9;
          > div{
            border-bottom: none;
          }
        }
      }
      .oprate{
        font-size: 16px;
        color:$c-blue;
        border-top:1px solid #B3CFF4;
        div{
          cursor: pointer;
          padding:0 20px;
        }
      }
    }
  }
  .filter-num{
    display: inline-block;
    width:30px;
  }
  .select{
    color:$c-blue;
  }
  table[vertical=top]{
    td{
      vertical-align: top;
    }
  }
  table[vertical=bottom]{
    td{
      vertical-align: bottom;
    }
  }
  .ctable-nomore{
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color:gray;
    &.bill,info{
      background: #EDF6FD;
    }
  }
</style>
<template>
  <div class="ctable">
    <!--表头-->
    <table style="width:100%" :class="[type]" :falign="align" cellspacing="0" cellpadding="0">
      <s-colgroup :columns="columns" :width="tableWidth"></s-colgroup>
      <thead>
        <tr>
          <th
            v-for="(th,i) in fcolumns"
            :class="`col-${_uid}-${i}`"
            @click="$emit('head-click',th)"
            :style="{cursor:th.oprate?'pointer':''}"
            :align="th.align"
            :key="th.prop"
          >
          <div class="cell" :class="{none:th.prop === 'table-check' || !th.label}">
              <!--无操作-->
              <template v-if="!th.oprate">
                <div v-if="th.prop === 'table-check'">
                  <el-checkbox v-model="th.check" @change="columnSelectAll"></el-checkbox>
                </div>
                <div v-else>
                  {{th.label}}
                </div>
              </template>
              <!-- 搜索筛选 -->
              <div v-if="th.oprate === 'filter'" class="filter">
                <div @click="opShow(th,i)" :class="getSelectStatus(th.filteData.filters)">
                  {{th.label}} <i class="el-icon-arrow-down" :class="{active:th.opshow}"></i>  <span class="filter-num" v-if="th.filteData.mutiple && getSelectNum(th)">{{getSelectNum(th)}}</span>
                </div>
                <transition name="el-zoom-in-top">
                  <div class="table-filter dialog-bg comment-filter" v-if="th.opshow" :style="{right:i === fcolumns.length - 1?0:''}">
                    <div class="search-box" v-if="th.filteData.search">
                      <div>
                        <i class="search"></i>
                        <input type="text" placeholder="搜索" v-model="th.searchKey">
                      </div>
                    </div>
                    <div v-if="th.filteData.mutiple" class="list">
                      <ul>
                        <li class="full-select">
                          <el-checkbox label="全选" @change="doSelectAll($event,th)"></el-checkbox>
                        </li>
                        <li v-for="item in th.flist" :key="item.id">
                          <div>
                            <el-checkbox :label="item.name" v-model="item.select"></el-checkbox>
                          </div>
                        </li>
                      </ul>
                      <div class="oprate flex type3">
                        <div @click="filterChange(th,true)">确定</div>
                        <div @click="filterChange(th,false)">重置</div>
                      </div>
                    </div>
                    <div v-else class="list radio">
                      <ul>
                        <li
                          v-for="item in th.flist"
                          class="radio"
                          :key="item.id"
                          :class="{select:item.select}"
                          @click="radioChange(th,item.id)">
                          <div>
                            {{item.name}}
                            <i class="el-icon-check" v-if="item.select"></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </transition>
              </div>
              <!--带排序-->
              <div class="sort clear" v-if="th.sort">
                <i :class="{active:(sortColumn === th.prop && sortStatus === 'ascending')}" @click="setSort(th.prop,'ascending')"></i>
                <i :class="{active:(sortColumn === th.prop && sortStatus === 'descending')}" @click="setSort(th.prop,'descending')"></i>
              </div>
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <!-- tbody体 -->
    <div class="s-body" :style="{'max-height': height+'px' || 'auto'}">
      <table
        style="width:100%"
        :class="[type]"
        :falign="align"
        :vertical="vertical"
        cellspacing="0"
        cellpadding="0"
      >
        <s-colgroup :columns="columns" :width="tableWidth"></s-colgroup>
        <!-- 正常列表 -->
        <template>
          <tbody>
            <tr v-for="(row,i) in data" :key="i" @click="rowClick($event,row,i)">
              <td
                v-for="(item,ci) in columns"
                :align="item.align"
                :class="getClass(item,row,ci)"
                :key="item.prop"
              >
                <template>
                  <t-render :row="row" :index="i" :col="item"></t-render>
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>
    <div class="ctable-nomore" v-if="data.length === 0" :class="[type]">暂无数据</div>
  </div>
</template>
<script>
/**
 * ctable组件说明
 * @param {table.props}
 * data 表格数据
 * height 表格高度 用于滚动
 * type 表格类名
 *    def 默认表格样式
 *    bill 蓝色账单格式
 *    info 蓝色背景  操作模式 table-check列 覆盖底边框  见短信模块表格
 * align left right 表格全局内容横向浮动设置
 * vertical top bottom 不填写为中间 td内容纵向浮动
 * disabled Oject {key:'',value:''} 如果某一行中的key值 等于 其中的value 则该行所有td元素加入 disabled类名
 * disdelete Oject {key:'',value:''} 如果某一行中的key值 等于 其中的value 则该行所有td元素加入 disused类名
 * disred Oject {key:'',value:''} 如果某一行中的key值 等于 其中的value 则该行所有td元素加入 red类名
 * disgray Oject {key:'',value:''} 如果某一行中的key值 等于 其中的value 则该行所有td元素加入 gray类名
 * draggable object {open:true} 是否允有拖动操作 open为 true可拖动
 * columns arr
 *    带选择列
 *      {
          prop: 'table-check',
          width: 60
        },
 *    check true 加入选项为选择列
 *    label 表头显示
 *    align left right 单列浮动设置
 *    prop 此行字段名
 *    oprate [filter] 操作方式 不写默认显示label
 *    filteData 筛选参数
 *      search bool 是否带搜索
 *      mutiple 筛选方式是否为多选
 *      filters 筛选项 数组对象 对象中必须含有 id name属性
 *    width 列宽度 数字
 *    sort bool 是否有排序功能
 *    render 如果存在 则td内容按 render渲染 否则渲染字段值 render参数 (h,{row,index,col})
 *    filter function 过滤函数 参数为当前prop 键值
 * @param {table.event}
 * sort-change 字段排序更改 触发参数 (字段名,排序方式 asc·desc)
 * filter-change 筛选事件 触发参数(筛选后的对象数组 与filters 一致,字段名) //多选和单选都为统一参数与事件
 * head-click 点击表头某一列 触发参数(当前columns)
 * row-click 表格行点击事件 触发参数(row,index)
 * select-change 选中某一列或者全部触发 param1 元素组成的数组 param2 是否选中 boolean
 * @param {table.method}
 * getSelectRow 获取所有选中的列数据
 * clearFilters 清空所有筛选状态
 * clearSelector 清空所有选中
 * chooseRow(i) 选中某一行
 */
// import stbody from './table-body'
export default {
  components: {
    // td组件渲染
    tRender: {
      functional: true,
      /**
       * @param {row} obj 行数据
       * @param {index} number 行索引
       * @param {col} obj 列属性
       */
      props: ['row', 'index', 'col'],
      render (h, ctx) {
        var child;
        var { col } = ctx.props;
        if (col.render) {
          var view = col.render(h, ctx.props);
          // mouseover 才显示
          if (col.hover) {
            view = <div class='hover'>{view}</div>;
          }
          child = [view];
        } else {
          var childText = eval(`ctx.props.row.${col.prop}`);// eslint-disable-line
          if (col.filter) {
            childText = col.filter(childText);
          }
          child = childText || h('i', { class: ['el-icon-minus'] });
        }
        var tdclass = col.class || [];
        return h(
          'div',
          {
            class: ['cell', ...tdclass]
          },
          child
        );
      }
    },
    // colgroup组件 用于计算列宽度
    sColgroup: {
      functional: true,
      props: ['columns', 'width'],
      render (h, ctx) {
        var { columns, width } = ctx.props;
        var setCol = columns.filter(c => {
          if (c.width) {
            width -= parseInt(c.width, 10);
          }
          return c.width;
        });
        // 平均列宽度
        var ave = parseInt(width / (columns.length - setCol.length), 10);
        var colArr = [];
        columns.forEach((col, i) => {
          var attrs = {
            name: `col-${ctx.parent._uid}-${i}`,
            width: col.width || (col.prop === 'table-check' ? 30 : ave)
          };
          colArr.push(h('col', { attrs }));
        });
        return h('colgroup', colArr);
      }
    }
  },
  data () {
    return {
      date: null,
      tableWidth: 0,
      sortColumn: null,
      sortStatus: '',
      fcolumns: [],
      selectAll: false,
      // 筛选栏显示状态
      opshow: {},
      // 控制数据选中状态
      checkArr: []
    };
  },
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    type: {
      type: String,
      default: 'def'
    },
    height: [Number, String],
    align: String,
    vertical: String,
    disabled: {
      type: Object,
      default: null
    },
    disdelete: {
      type: Object,
      default: null
    },
    disred: {
      type: Object,
      default: null
    },
    disgray: {
      type: Object,
      default: null
    },
    draggable: {
      type: [Boolean, Object],
      default: null
    }
  },
  watch: {
    columns () {
      this.forMateCol();
    },

    data () {
      this.forMateData();
    }
  },
  methods: {
    selected (e, row) {
      // this.$emit('select-change',[row],e.target.checked)
      if (!e.target.checked) {
        this.fcolumns[0].check = false;
      }
    },
    // 选人
    selectman (id, bool) {
      var data = {
        id: id,
        bool: bool
      };
      BUS.$emit('selectman', data);// eslint-disable-line
    },
    singlecheckd (row) {
      BUS.$emit('fsinglecheck', row.id, row.name);// eslint-disable-line
    },
    // 获取td内容class
    getClass (col, row, colindex) {
      var cla = [];
      cla.push(`col-${this._uid}-${colindex}`);
      if (this.disabled) {
        if (this.disabled.value === row[this.disabled.key]) {
          cla.push('disabled');
        }
      }
      if (col.prop === 'table-check') {
        cla.push('check');
      }
      return cla;
    },
    // 点击在选择框上不触发行点击事件
    rowClick (e, row, i) {
      // if (
      //   [
      //     'el-checkbox__input',
      //     'el-checkbox__inner',
      //     'el-checkbox__original'
      //   ].indexOf($(e.target).attr('class')) !== -1
      // ) {
      //   return;
      // }
      // this.$emit('row-click', row, i);
    },
    // 设置列排序
    setSort (prop, order) {
      var isSelect = this.sortColumn === prop && this.sortStatus === order;
      this.sortColumn = isSelect ? null : prop;
      this.sortStatus = isSelect ? null : order;
      this.$emit('sort-change', this.sortColumn, this.sortStatus);
    },
    // 选中获取消所有行
    columnSelectAll (e) {
      console.log(e);
      this.checkArr = this.checkArr.map(() => e.target.checked);
      this.$emit('select-change', this.data, e.target.checked);
    },
    // 筛选条件 多选 选择全部或取消
    doSelectAll (e, th) {
      console.log(th);
      th.flist.forEach(item => (item.select = e.target.checked));
    },
    // 多选筛选变化
    filterChange (th, op) {
      if (op) {
        this.$emit(
          'filter-change',
          th.filteData.filters.filter(obj => obj.select),
          th.prop
        );
      } else {
        th.filteData.filters.forEach(obj => (obj.select = false));
        this.$emit('filter-change', [], th.prop);
      }
      th.opshow = false;
    },
    // 获取多选筛选中的选中数量
    getSelectNum (th) {
      if (th.filteData.mutiple) {
        var count = th.filteData.filters.filter(f => f.select).length;
        return count ? `(${count})` : '';
      }
    },
    // 单选筛选变化
    radioChange (th, id) {
      var choose = [];
      th.filteData.filters.forEach(t => {
        if (t.id === id && !t.select) {
          t.select = true;
          choose.push(t);
        } else {
          t.select = false;
        }
      });
      // 延迟收起 选中和取消改变更直观
      setTimeout(() => {
        th.opshow = false;
      }, 60);
      this.$emit('filter-change', choose, th.prop);
    },
    // 判断筛选表头是否为选中颜色
    getSelectStatus (filters) {
      var select = filters.some(f => f.select);
      return { select };
    },
    // 判断若直接点击表头收起筛选 则返回原状态
    opShow (th) {
      if (th.opshow) {
        th.filteData.filters = this[th.prop + 'filter'];
      } else {
        this[th.prop + 'filter'] = this.copy(th.filteData.filters);
      }
      // th.opshow = !th.opshow
      this.$set(th, 'opshow', !th.opshow);
    },
    // // 格式化columns
    forMateCol () {
      this.fcolumns = this.copy(this.columns).map(col => {
        if (col.filteData) {
          col.opshow = false;
          col.searchKey = '';
          col.filteData.filters.forEach(item => (item.select = false));
          // 搜索筛选
          Object.defineProperty(col, 'flist', {
            get () {
              return this.filteData.filters.filter(
                f => !this.searchKey || f.name.indexOf(this.searchKey) !== -1
              );
            }
          });
        }
        if (col.prop === 'table-check') {
          col.check = false;
        }
        return col;
      });
    },
    // 格式化data
    forMateData () {
      this.checkArr = [];
      if (this.columns.some(c => c.prop === 'table-check')) {
        this.data.map((d, i) => {
          this.checkArr[i] = false;
          return d;
        });
      }
    },
    // 外界获取所选中的数据对象
    getSelectRow () {
      // return this.fdata.filter(data => data.check)
      var selectRows = [];
      this.checkArr.forEach((e, i) => {
        if (e) {
          selectRows.push(this.data[i]);
        }
      });
      return selectRows;
    },
    // 外界清空所有筛选状态
    clearFilters () {
      this.fcolumns.forEach(col => {
        if (col.filteData) {
          col.filteData.filters.forEach(fi => {
            fi.select = false;
          });
        }
      });
    },
    // 清空所有选中
    clearSelector () {
      this.fcolumns.some(col => {
        if (col.prop === 'table-check') {
          col.check = false;
          return true;
        }
      });
      this.checkArr.map(() => false);
    },
    // 全局点击 关闭筛选框事件
    closeFilter (e) {
      /* eslint-disable */
      if (
        $(e.target).hasClass('table-filter') ||
        $(e.target).parents('.cell').length
      ) {
        return true;
      }
      /* eslint-enable */
      this.fcolumns.forEach(col => {
        if (col.filteData && this[col.prop + 'filter'] && col.opshow === true) {
          col.filteData.filters = this[col.prop + 'filter'];
        }
        col.opshow = false;
      });
    },
    // 强制刷新方法
    refresh (i, key, val) {
      this.$set(this.fdata[i], key, val);
    },
    // 选中列 数字或 数字组成的数组
    chooseRow (rows, checked) {
      if (typeof rows === 'number') {
        this.$set(this.checkArr, rows, checked);
      } else {
        rows.forEach(i => {
          this.$set(this.checkArr, i, checked);
        });
      }
    },
    resize () {
      this.tableWidth = this.$el.clientWidth;
    }
  },
  // 表头信息初始化
  beforeMount () {
    this.forMateCol();
    this.forMateData();
  },
  destroyed () {
    window.removeEventListener('click', this.closeFilter);
    window.removeEventListener('resize', this.resize);
  },
  mounted () {
    this.tableWidth = this.$el.clientWidth;
    window.addEventListener('click', this.closeFilter);
    window.addEventListener('resize', this.resize);
  }
};
</script>

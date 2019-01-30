<template>
<div>
  <s-table
    :columns="columns"
    :data="tableData"
    ref="clist"
    height="auto">
  </s-table>
  <Edit v-if="flag" :goodId="current" />
</div>
</template>
<script>
// @ is an alias to /src
import { getGoodsList } from '@/api/goods';
import Edit from './edit';
export default {
  name: 'goods_list',
  components: { Edit },
  data () {
    const _this = this;
    return {
      current: '',
      flag: false,
      columns: [
        {
          label: 'name',
          prop: 'name'
        },
        {
          label: 'create_Time',
          prop: 'create_time'
        },
        {
          label: 'update_Time',
          prop: 'update_time'
        },
        {
          label: 'price',
          prop: 'price',
          render (h, { row }) {
            return (<div class="allRight">￥{row.price}</div>);
          }
        },
        {
          label: 'onSale',
          prop: 'onsale'
        },
        {
          label: '操作',
          render (h, { row }) {
            return (
              <div class="operate">
                <span onClick={ () => { _this.showModal(row); } }>修改</span> | <span>查看</span>
              </div>
            );
          }
        }
      ],
      tableData: []
    };
  },
  created () {
    getGoodsList().then(res => {
      this.tableData = res.data.goods;
    });
  },
  methods: {
    showModal (val) {
      console.log(val);
      this.current = val.id;
      this.flag = true;
    }
  },
  mounted () {
    this.val = 'aaaa';
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

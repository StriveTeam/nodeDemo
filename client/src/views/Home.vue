<template>
  <div class="home">
    <s-table
      :columns="columns"
      :data="tableData"
      ref="clist"
      height="auto">
    </s-table>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      title="提示"
      :appendToBody="true"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{val}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
import { getTableData } from '@/api/goods';
export default {
  name: 'home',
  components: {},
  data () {
    const _this = this;
    return {
      dialogVisible: false,
      val: '',
      columns: [
        {
          label: '台号',
          prop: 'seatsnums'
        },
        {
          label: '开台时间',
          prop: 'open_time'
        },
        {
          label: '闭台时间',
          prop: 'close_time'
        },
        {
          label: '总金额',
          prop: 'pay_sum_money',
          render (h, { row }) {
            return (<div class="allRight">{row.pay_sum_money}</div>);
          },
          sort: true
        },
        {
          label: '销售',
          prop: 'sales_name',
          oprate: 'filter',
          filteData: {
            search: true,
            mutiple: true,
            get filters () {
              // return _this.$store.state.order.saleslist;
              return [];
            }
          }
        },
        {
          label: '客户',
          render (h, { row }) {
            return (
              <div>
                <div>
                  {row.username}
                </div>
                <div>
                  {row.mobile_hid}
                </div>
              </div>
            );
          }
        },
        {
          label: '收银人',
          prop: 'cashier_names'
        },
        {
          label: '操作',
          render (h, ctx) {
            return (
              <div class="commo-detail-button"
                onClick={
                  () => {
                    _this.$router.push(`/order/orderinfo/${ctx.row.seats_log_id}`);
                  }
                }>
                查看详情
              </div>
            );
          }
        }
      ],
      tableData: []
    };
  },
  created () {
    getTableData().then(res => {
      console.log(res);
      this.tableData = res.data.list;
    });
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted () {
    this.val = 'aaaa';
  }
};
</script>

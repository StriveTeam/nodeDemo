<template>
  <div>
    <!-- <s-table :columns="columns" :data="tableData" :draggable="true" ref="clist" height="auto"></s-table> -->
    <el-form
      onSubmit="return false"
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="text-align: left;"
    >
      <el-form-item label>
        <el-input v-model="formInline.des" placeholder="发送" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <ul style="text-align: left;">
      <li v-for="(item, index) in reciveData" :key="index">{{item.des}}</li>
    </ul>
    <Edit v-if="flag" :goodId="current" @closeModal="closeModal" />
  </div>
</template>
<script>
/* eslint-disable */
// @ is an alias to /src
import { getGoodsList } from '@/api/goods';
import Edit from './edit';
export default {
  name: 'goods_list',
  components: { Edit },
  data() {
    const _this = this;
    return {
      formInline: {
        des: '',
        region: ''
      },
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
          render(h, { row }) {
            return <div class="allRight">￥{row.price}</div>;
          }
        },
        {
          label: 'onSale',
          prop: 'onsale'
        },
        {
          label: '操作',
          render(h, { row }) {
            return (
              <div class="operate">
                <span
                  onClick={() => {
                    _this.showModal(row);
                  }}
                >
                  修改
                </span>{' '}
                | <span>查看</span>
              </div>
            );
          }
        }
      ],
      tableData: [],
      reciveData: []
    };
  },
  sockets: {
    connect: function() {
      console.log('socket connected');
    },
    reciveData: function(val) {
      this.reciveData = this.reciveData.concat([val]);
    }
  },
  created() {
    // getGoodsList().then(res => {
    //   this.tableData = res.data.goods;
    // });
  },
  mounted() {
    this.val = 'ggggg';
  },
  methods: {
    onSubmit() {
      this.$socket.emit('test', this.formInline);
    },
    showModal(val) {
      console.log(val);
      this.current = val.id;
      this.flag = true;
    },
    closeModal() {
      this.flag = false;
    }
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

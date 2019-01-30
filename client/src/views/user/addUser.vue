<template>
  <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="60px" class="addUserForm">
    <el-form-item label="账号" prop="user_name">
        <el-input type="text" v-model="addUserForm.name" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="addUserForm.pass" auto-complete="off"></el-input>
    </el-form-item>

    <el-form-item label="角色" prop="role">
      <el-radio-group v-model="addUserForm.role">
        <el-radio :label="100">管理员</el-radio>
        <el-radio :label="1">员工</el-radio>
        <el-radio :label="10">测试</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="submitForm('addUserForm')">新建</el-button>
        <el-button @click="resetForm('addUserForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userAdd } from '@/api/user';
export default {
  name: 'login',
  data () {
    return {
      addUserForm: {
        name: '',
        pass: '',
        role: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        role: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
      }
    };
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userAdd(this.addUserForm).then(res => {
            if (res.code === 200) {
              this.$message.success('添加成功');
              this.$router.push('/login');
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },

    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  created () {}
};
</script>
<style lang="scss">
.addUserForm {
  margin: 100px auto;
}
</style>

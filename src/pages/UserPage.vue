<template>
  <van-cell title="用户名" is-link to="user/edit" :value="user.username"
            @click="toEdit('username', '用户名', user.username)"/>
  <van-cell title="用户账号" :value="user.userAccount"/>
  <van-cell title="头像" is-link to="user/edit"
            @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
    <img style="height: 40px" :src="user.avatarUrl" />
  </van-cell>
  <van-cell title="性别" is-link to="user/edit" :value="user.gender"
            @click="toEdit('gender', '性别', user.gender)"/>
  <van-cell title="电话" is-link to="user/edit" :value="user.phone"
            @click="toEdit('phone', '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="user/edit" :value="user.email"
            @click="toEdit('email', '邮箱', user.email)"/>
  <van-cell title="验证编号" :value="user.validateCode"/>
  <van-cell title="注册时间" :value="user.createTime.toISOString()"/>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: '菜鸟',
  userAccount: 'admin',
  avatarUrl: 'https://typora-myself.oss-cn-hangzhou.aliyuncs.com/typora_img/Project--测试用头像.jpg',
  gender: '男',
  phone: '123345556',
  email: '125345@gmail.com',
  validateCode: '1324',
  createTime: new Date(),
}

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: 'user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>
<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
      <div style="margin: 10px"></div>
      <van-button round block type="primary" @click="doRegister">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  // @ts-ignore
  if (res.code === 0 && res.data) {
    window.location.href = route.query?.redirect as string ?? '/';
    showSuccessToast("登录成功");
  } else {
    showFailToast("登录失败")
  }
};

const doRegister = async () => {
  router.push({
    path: '/user/register',
  })
}

</script>

<style scoped>

</style>
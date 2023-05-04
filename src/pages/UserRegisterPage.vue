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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="密码"
          placeholder="请重复输入密码"
          :rules="[{ required: true, message: '请填写重复密码' }]"
      />
      <van-field
          v-model="validateCode"
          name="validateCode"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import { useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const validateCode = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    validateCode: validateCode.value,
  })
  // @ts-ignore
  if(res.code === 0 && res.data) {
    router.replace("/user/login");
    showSuccessToast("注册成功");
  } else {
    showFailToast("注册失败")
  }
};

</script>

<style scoped>

</style>
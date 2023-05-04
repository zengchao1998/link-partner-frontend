<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改个人信息" is-link to="/user/update" />
    <van-cell title="我加入的队伍" is-link to="/team/joined" />
    <van-cell title="我创建的队伍" is-link to="/team/owner" />
  </template>
  <van-button id="logout-button" round block type="primary" @click="doLoginOut">
    退出登录
  </van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

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

const doLoginOut = async () => {
  const res = await myAxios.post('/user/logout')
  // @ts-ignore
  if (res.code === 0) {
    router.replace('/user/login');
  } else {
    showFailToast("登出失败")
  }
}
</script>

<style scoped>

</style>
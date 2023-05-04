<template>
  <van-cell center title="推荐模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length === 0" description="数据为空"></van-empty>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);
const isMatchMode = ref<boolean>(false);
const loading = ref(true);

// 加载数据
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 推荐模式，根据标签显示推荐用户
  if(isMatchMode.value) {
    const num = 8;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed' + response);
          return response?.data;
        })
        .catch(function (error) {
          showFailToast('请求失败')
          console.log('/user/match error' + error);
        })
  } else {
    // 普通模式，分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageNum: 1,
        pageSize: 8,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed' + response);
          return response?.data?.records;
        })
        .catch(function (error) {
          showFailToast('请求失败')
          console.log('/user/recommend error' + error);
        })
  }
  if(userListData) {
    userListData.forEach((user: { tags: string; }) => {
      if(user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>
</style>
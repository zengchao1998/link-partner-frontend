<template>
  <user-card-list :user-list="userList" />
  <van-empty v-if="!userList || userList.length === 0" description="搜索结果为空"></van-empty>
</template>

<script setup lang="ts">
import {useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;
const userList = ref([]);

// 页面加载时从远程获取数据
onMounted(async () => {

  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagsNameList: tags
    },
    // 对参数进行序列化处理
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed' + response);
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error' + error);
      })

  if(userListData) {
    userListData.forEach((user: { tags: string; }) => {
      if(user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})

</script>

<style scoped>
</style>
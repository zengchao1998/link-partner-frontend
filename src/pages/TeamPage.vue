<template>
  <div id="addTeam">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="private"></van-tab>
    </van-tabs>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="数据为空"></van-empty>
  </div>
  <van-button class="add-button" type="primary" icon="plus"
              @click="doCreateTeam"></van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";

const router = useRouter();
const active = ref('public');
const searchText = ref('');
const currentHome = ref('public');

// 公开与加密房间区分
const onTabChange = (name: string) => {
  if(name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    currentHome.value = name;
    listTeam(searchText.value, 2);
  }
}

// 跳转到创建队伍页
const doCreateTeam = () => {
  router.push({
    path: "/team/add"
  });
}

const teamList = ref([]);

// 搜索队伍方法
const listTeam = async (val: string, status: number) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      status: status,
    }
  })
  if(res?.code === 0) {
    teamList.value = res.data;
    // showSuccessToast("获取成功")
  } else {
    showFailToast("获取失败")
  }
}

// 显示所有队伍信息
onMounted(() => {
  listTeam(searchText.value, 0);
})

// 搜索指定队伍信息
const onSearch = () => {
  if(currentHome.value === 'public') {
    listTeam(searchText.value, 0);
  } else {
    listTeam(searchText.value, 2);
  }
}

</script>

<style scoped>

</style>
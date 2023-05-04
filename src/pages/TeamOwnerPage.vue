<template>
  <div id="addTeam">
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="数据为空"></van-empty>
  </div>
  <van-button class="add-button" icon="plus" type="primary" @click="doJoinTeam" ></van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast} from "vant";

const router = useRouter();

// 跳转到加入队伍页
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  });
}

const teamList = ref([]);

// 搜索队伍方法
const listTeam = async () => {
  const res = await myAxios.get("/team/owner")
  if(res?.code === 0) {
    teamList.value = res.data;
    // showSuccessToast("获取成功")
  } else {
    showFailToast("获取失败")
  }
}

// 显示所有队伍信息
onMounted(() => {
  listTeam();
})

</script>

<style scoped>

</style>
<template>
  <template v-if="user">
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
    <van-cell title="标签" is-link to="user/edit" :value="user.tags"
              @click="toEditTags('tags', '标签', user.tags)"/>
    <van-cell title="验证编号" :value="user.validateCode"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const toEditTags = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit/tags',
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
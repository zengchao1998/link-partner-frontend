<template>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds?.length === 0">请选择你的标签</div>
  <van-row gutter="16">
    <van-col span="4" v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">新选标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <van-button id="edit-tags-button" round block type="primary" native-type="submit" @click="onSubmit">
    提交
  </van-button>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {originTagList} from "../constants/label";

const route = useRoute();
const router = useRouter();

// 已选标签
const activeIds = ref([]);
const activeIndex = ref();

let tagList = ref(originTagList);

// 移除选中标签
const doClose = (tag: any) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
};

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
})

// 提交修改结果到后端
const onSubmit = async () => {

  // 获取用户的登录信息
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    showFailToast("用户未登录")
    return;
  }

  const res = await myAxios.post('/user/update', {
    // @ts-ignore
    'id': currentUser.id,
    [editUser.value.editKey as string]: JSON.stringify(activeIds.value),
  })
  // @ts-ignore
  if(res.code === 0 && res.data > 0) {
    showSuccessToast("修改成功")
    await router.push('/user/update')
  } else {
    showFailToast('修改失败')
  }
};

</script>

<style scoped>

</style>
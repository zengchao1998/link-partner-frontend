<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row gutter="16">
    <van-col span="4" v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 20px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from "vue-router";
import {originTagList} from "../constants/label";

const router = useRouter();
// 搜索框内容
const searchText = ref('');

// 已选标签
const activeIds = ref([]);
const activeIndex = ref();

let tagList = ref(originTagList);

// 搜索指定标签
const onSearch = (val: any) => {
  tagList.value = originTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
        return tempParentTag;
      });
}

// 取消搜索内容
const onCancel = () => {
  searchText.value = ''
  tagList.value = originTagList;
}

// 移除选中标签
const doClose = (tag: any) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
};

// 提交搜索结果,并跳转到搜索结果页(携带标签参数)
const doSearchResult = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeIds.value,
    }
  });
}
</script>

<style scoped>
</style>
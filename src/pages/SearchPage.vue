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

const router = useRouter();
// 搜索框内容
const searchText = ref('');

// 已选标签
const activeIds = ref([]);
const activeIndex = ref();

// 标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
      { text: '研一', id: '研一' },
      { text: '研二', id: '研二' },
      { text: '研三', id: '研三' },
      { text: '博士', id: '博士' },
    ],
  },
]

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
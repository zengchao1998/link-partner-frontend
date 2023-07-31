<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="editUser.editKey"
        :label="editUser.editName"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
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
    [editUser.value.editKey as string]: editUser.value.currentValue,
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
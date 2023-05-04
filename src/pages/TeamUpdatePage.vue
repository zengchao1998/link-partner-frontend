<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="currentTeamData.teamName"
          name="teamName"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请填写用户名称' }]"
      />

      <van-field
          v-model="currentTeamData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请输入队伍描述"
      />

      <van-field
          v-model="chooseTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          :placeholder="currentTeamData.expireTime ?? '请选择过期时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            :min-date="minDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"/>
      </van-popup>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="currentTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="currentTeamData.status === '2'"
          v-model="currentTeamData.teamPassword"
          type="password"
          name="teamPassword"
          label="队伍密码"
          placeholder="请输入队伍密码"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();

// 当前队伍的信息
const currentTeamData = ref({});

const teamId = route.query.id;

// 获取队伍信息
onMounted(async () => {
  if(teamId <= 0) {
    showFailToast("获取队伍信息失败");
    return
  }
  const res = await myAxios.get("/team/get", {
    params: {
      teamId,
    }
  })
  // @ts-ignore
  if (res?.code === 0) {
    currentTeamData.value = res.data;
  } else {
    // @ts-ignore
    showFailToast("获取队伍信息失败")
  }
})

// 定义最小时间
const minDate = new Date();

// 默认时间选择器
const chooseTime = ref('')
const showPicker = ref(false);

const onConfirm = ({selectedValues}) => {
  chooseTime.value = selectedValues.join('/')
  currentTeamData.value.expireTime = selectedValues.join('-')
  showPicker.value = false;
};

const onSubmit = async () => {
  const postData = {
    ...currentTeamData.value,
    status: Number(currentTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("更新成功");
    router.push({
      path: '/team',
      // 禁止返回到原始界面
      replace: true,
    });
  } else {
    showFailToast("更新失败");
  }
};

</script>

<style scoped>

</style>
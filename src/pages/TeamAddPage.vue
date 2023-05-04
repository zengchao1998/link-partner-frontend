<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.teamName"
          name="teamName"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请填写用户名称' }]"
      />

      <van-field
          v-model="addTeamData.description"
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
          placeholder="请选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            :min-date="minDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"/>
      </van-popup>

      <van-field name="stepper" label="最大人数" max="10" min="3">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum"/>
        </template>
      </van-field>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="addTeamData.status === '2'"
          v-model="addTeamData.teamPassword"
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
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();

const initFormData = {
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "status": 0,
  "teamName": "",
  "teamPassword": ""
}

// 用户填写的表单数据
const addTeamData = ref({...initFormData});

// 定义最小时间
const minDate = new Date();

// 默认时间选择器
const chooseTime = ref('')
const showPicker = ref(false);

const onConfirm = ({selectedValues}) => {
  chooseTime.value = selectedValues.join('/')
  addTeamData.value.expireTime = selectedValues.join('-')
  showPicker.value = false;
};

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("添加成功");
    router.push({
      path: '/team',
      // 禁止返回到原始界面
      replace: true,
    });
  } else {
    showFailToast("添加失败");
  }
};

</script>

<style scoped>

</style>
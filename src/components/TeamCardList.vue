<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="'队伍描述: ' + team.description"
        :thumb="defaultPng"
        :title="team.teamName + ': ' + (team.createUser?.username ?? 'self')"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{"队伍人数: " + team.teamNum + "/" + team.maxNum }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间:' + team.expireTime }}
        </div>
        <div v-if="team.createTime">
          {{ '创建时间:' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" type="primary" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" type="primary" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" type="primary" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="加入队伍" show-cancel-button
                @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="teamPassword" placeholder="请输入队伍密码"></van-field>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import defaultPng from "../assets/default.png"
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

// 自动的将父组件传入的用户信息转换成 TeamCardListProps 类型
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const router = useRouter();

const showPasswordDialog = ref(false);
// 记录输入的队伍密码
const teamPassword = ref('');
// 记录加入的队伍id
const joinTeamId = ref(0);
// 记录当前登录用户
const currentUser = ref();

// 获取当前登录用户
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

// 加入队伍的预处理
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if(team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  teamPassword.value = '';
}

// 加入队伍
// todo 队伍密码的实现逻辑
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    id: joinTeamId.value,
    teamPassword: teamPassword.value,
  })
  // @ts-ignore
  if (res?.code === 0) {
    showSuccessToast("加入成功");
    doJoinCancel();
  } else {
    // @ts-ignore
    showFailToast("加入失败" + (res.description ? `, ${res.description}` : ''))
  }
}

// 更新队伍信息(页面跳转)
const doUpdateTeam = (id: number) => {
  router.push({
    // todo 页面跳转
    path: "/team/update",
    query: {
      id,
    }
  })
}

// 退出队伍
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    id,
  })
  // @ts-ignore
  if (res?.code === 0) {
    showSuccessToast("操作成功")
  } else {
    // @ts-ignore
    showFailToast("操作失败" + (res.description ? `, ${res.description}` : ''))
  }
}

// 解散队伍
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    teamId: id,
  })
  // @ts-ignore
  if (res?.code === 0) {
    showSuccessToast("操作成功")
  } else {
    // @ts-ignore
    showFailToast("操作失败" + (res.description ? `, ${res.description}` : ''))
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
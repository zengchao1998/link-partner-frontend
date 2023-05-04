// 定义路由
import Index from "../pages/Index.vue";
import SearchPage from "../pages/SearchPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import TeamJoinedPage from "../pages/TeamJoinedPage.vue";
import TeamOwnerPage from "../pages/TeamOwnerPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";

const routes = [
    {path: '/', title: "主页", component: Index},
    {path: '/team', title: "寻找队伍", component: TeamPage},
    {path: '/user', title: "用户信息", component: UserPage},
    {path: '/search', title: "搜索用户", component: SearchPage},
    {path: '/user/edit', title: "编辑用户信息", component: UserEditPage},
    {path: '/user/list', title: "用户列表", component: SearchResultPage},
    {path: '/user/login', title: "登录", component: UserLoginPage},
    {path: '/user/register', title: "注册", component: UserRegisterPage},
    {path: '/user/update', title: "更新用户", component: UserUpdatePage},
    {path: '/team/add', title: "添加用户", component: TeamAddPage},
    {path: '/team/update', title: "更新队伍", component: TeamUpdatePage},
    {path: '/team/joined', title: "已加入队伍", component: TeamJoinedPage},
    {path: '/team/owner', title: "已创建队伍", component: TeamOwnerPage},
]

export default routes;
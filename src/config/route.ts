// 定义路由
import Index from "../pages/Index.vue";
import SearchPage from "../pages/SearchPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team', component: TeamPage },
    { path: '/user', component: UserPage },
    { path: '/search', component: SearchPage },
    { path: '/user/edit', component: EditUserPage },
]

export default routes;
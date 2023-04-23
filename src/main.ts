import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style';
import * as VueRouter from 'vue-router';
import routes from "./config/route";

const app = createApp(App);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);
app.mount('#app')

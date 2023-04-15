import { createApp } from 'vue'
import App from './App.vue'
import {Button, NavBar} from 'vant';
import * as VueRouter from 'vue-router';
import routes from "./config/route";

const app = createApp(App);
app.use(Button);


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);
app.mount('#app')

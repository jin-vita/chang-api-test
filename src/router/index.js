import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "../views/HomeView.vue";

const routes = [
    // 홈 화면
    {
        path: '/',
        component: HomeView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

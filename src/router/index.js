import {createRouter, createWebHistory} from 'vue-router'
import CrudTest from "../views/CrudTest.vue";
import ApiTest from "../views/ApiTest.vue";

const routes = [
    // 홈 화면
    {
        path: '/',
        component: CrudTest
    },
    {
        path: '/api',
        component: ApiTest
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

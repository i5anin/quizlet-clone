// src/app/router.ts
import {createRouter, createWebHistory} from 'vue-router'
import CardPage from "@/pages/card/CardPage.vue"
import PollList from "@/pages/card/PollList.vue"

const routes = [
    {path: '/cards', component: CardPage},
    {path: '/pollist', component: PollList}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

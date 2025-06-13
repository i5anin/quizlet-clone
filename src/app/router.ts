// src/app/router.ts
import {createRouter, createWebHistory} from 'vue-router'
import CardPage from "@/pages/card/CardPage.vue"

const routes = [
    {path: '/cards', component: CardPage}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

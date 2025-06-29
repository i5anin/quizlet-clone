// src/app/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import PollList from '@/pages/card/PollList.vue'

const routes = [
    {
        path: '/cards/id/:id',
        name: 'card-by-id',
        component: PollList,
        props: true
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

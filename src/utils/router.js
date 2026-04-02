import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import Surat from '../components/Surah/Surat.vue'

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "Surat",
        path: "/surat",
        component: Surat
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
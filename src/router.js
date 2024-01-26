import { createRouter, createWebHistory } from 'vue-router'
// import FoodInput from './components/FoodInput.vue'
import ShowPantry from './components/ShowPantry.vue'
import AddFood from './components/AddFood.vue'
import UserLogin from './components/Login.vue'
import ClaimFood from './components/ClaimFood.vue'

const routes = [
    { path: '/', component: ShowPantry },
    { path: '/add', component: AddFood },
    { path: '/login', component: UserLogin },
    { path: '/claim', component: ClaimFood }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
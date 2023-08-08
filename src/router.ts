import * as VueRouter from 'vue-router'
import Home from './pages/home.vue'
import Errors from './pages/errors.vue'
import Plans from './pages/plans.vue'
import Users from './pages/users.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/erros', component: Errors },
    { path: '/plans', component: Plans },
    { path: '/users', component: Users },
]

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import manager from '@/components/manager'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/task/:id/',
            name: '投票主页',
            component: HelloWorld
        },
        {
            path: '/manager',
            name: '管理页面',
            component: manager
        }
    ]
})


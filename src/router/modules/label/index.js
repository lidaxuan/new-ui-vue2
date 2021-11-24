export default [
    {
        path: '/visitorLabel',
        name: 'visitorLabel',
        component: () => import(/* webpackChunkName: "componentA" */ '@/views/label/visitorLabel.vue'),
        meta: {
            title: '访客标签',
            authCode: 'admin',
            keepAlive: false //缓存组件
        }
    }

]

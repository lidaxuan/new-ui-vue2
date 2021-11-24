export default [
    {
        path: '/douyin',
        name: 'douyin',
        component: () => import(/* webpackChunkName: "componentA" */ '@/views/comment/douyin.vue'),
        meta: {
            title: '抖音评论',
            authCode: 'admin',
            keepAlive: false //缓存组件
        }
    }

]

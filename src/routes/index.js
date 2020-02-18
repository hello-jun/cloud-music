import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home' // 首页
import Recommend from '../application/Recommend' // 推荐
import Singers from '../application/Singers' // 歌手
import Rank from '../application/Rank' // 排行榜

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={'/recommend'} /> // 什么意思？ 重定向到推荐榜？
            },
            {
                path: '/recommend',
                component: Recommend,
            },
            {
                path: '/singers',
                component: Singers,
            },
            {
                path: '/rank',
                component: Rank
                ,
            }
        ]
    },
]
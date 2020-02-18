import React from 'react'
import { renderRoutes } from "react-router-config"
import { NavLink } from 'react-router-dom'// 利用 NavLink 组件进行路由跳转
import { Top, Tab, TabItem } from './style'

const Home = (props) => {
    const { route } = props
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="webfont title">网易云音乐Hooks</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <Tab>
                <NavLink to="/recommend" activeClassName="webfont selected"><TabItem><span className='webfont'> 推荐 </span></TabItem></NavLink>
                <NavLink to="/singers" activeClassName="webfont selected"><TabItem><span className='webfont'> 歌手 </span></TabItem></NavLink>
                <NavLink to="/rank" activeClassName="webfont selected"><TabItem><span className='webfont'> 排行榜 </span></TabItem></NavLink>
            </Tab>
            {renderRoutes(route.routes)}
        </div>

    )
}

export default React.memo(Home) 

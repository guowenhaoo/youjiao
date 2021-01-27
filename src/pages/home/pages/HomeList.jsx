import React, { Component } from 'react'
import TopCard from "../components/top-card/top-card"
import BuyCount from "../components/buy-count/buy-count"
import SourceCount from "../components/source-count/source-count"


import "../home.css"

export default class HomeList extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-top">
                    <TopCard
                        pathLink="/home/sitesetting"
                        iconClassName="icon iconfont icon-hezuohuobanmiyueguanli"
                        cardMainTitle="网站设置"
                        cardSubTitle="客户端通用信息设置"
                        bgColor="red"
                    />
                     <TopCard
                        pathLink="/"
                        iconClassName="icon iconfont icon-fuwudiqiu"
                        cardMainTitle="管理员中心"
                        cardSubTitle="管理员管理"
                        bgColor="purple"
                    />
                    <TopCard
                        pathLink="/"
                        iconClassName="icon iconfont icon-shenjing"
                        cardMainTitle="系统说明"
                        cardSubTitle="系统使用说明"
                        bgColor="orange"
                    />
                </div>
                <div className="home-content">
                    <div className="home-content-card">
                        <SourceCount></SourceCount>
                    </div>
                    <div className="home-content-card">
                        <BuyCount></BuyCount>
                    </div>
                </div>
            </div>
        )
    }
}

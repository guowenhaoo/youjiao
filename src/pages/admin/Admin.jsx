import React, { Component } from 'react'
import LeftNav from "./components/left-nav/LeftNav"
import RightHeader from "./components/right-header/RightHeader"
import { Redirect, Route, Switch } from "react-router-dom"
import "./admin.css"
// 引入二级组件
import NotFound from "../notFount/NotFount"
import Home from "../home/Home"
import Resource from "../resource/Resource"
import Lifejob from "../lifejob/Lifejob"
import Activities from "../activities/Activities"
import Lives from "../lives/Lives"
import Setting from "../setting/Setting"
import AccountSetting from "../setting/components/AccountSetting"
import {isLogin} from "../../api/adminApi"
import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default class Admin extends Component {
    constructor(){
        super()
        this.state=({
            collapsed:false
        })
    }
    _toggle=()=>{
        this.setState({
            collapsed:!this.state.collapsed
        })

    }
    render() {
        isLogin()//如果是false表示没有登录
        if(!isLogin()){
            // 没有登录
           return <Redirect to="/login"></Redirect>
        }
        //代表登录了
        return (
            <Layout className="admin-pane" style={{height:"100%"}} >
                {/* 左边nav */}
                <LeftNav collapsed={this.state.collapsed} >  </LeftNav>
                {/* 右边的内容 */}
                <Layout>
                    {/* 右边的头部 */}
                    <RightHeader collapsed={this.state.collapsed} toggle={ this._toggle }></RightHeader>
                    {/* 主面板 */}
                    <Content className="admin-content">
                        <Switch>
                            <Route path="/setting/account" component={AccountSetting}></Route>
                            <Redirect path="/" exact to="/Home"> </Redirect>
                            <Route path="/home" component={ Home }></Route>
                            <Route path="/resource" component={ Resource }></Route>
                            <Route path="/lifejob" component={ Lifejob }></Route>
                            <Route path="/activities" component={ Activities }></Route>
                            <Route path="/live" component={ Lives }></Route>
                            <Route path="/setting" component={ Setting }></Route>
                            <Route path="*" component={ NotFound }></Route>
                        </Switch>
                    </Content>
                    {/* 底部 */}
                    <Footer style={{textAlign:'center'}}> 后台管理系统 </Footer>
                </Layout>
            </Layout>
        )
    }
}

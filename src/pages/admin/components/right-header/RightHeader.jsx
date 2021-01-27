import React, { Component } from 'react'
import logo from "../left-nav/images/logo.png"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { checkLogOut,removeUser } from "../../../../api/adminApi"
import { MenuUnfoldOutlined,MenuFoldOutlined,} from '@ant-design/icons';
import "./right-header.css"
import { Button ,Layout,Modal,message} from 'antd';
const { confirm } = Modal
const { Header } = Layout;

 class RightHeader extends Component {
    static propTypes = {
        collapsed:PropTypes.bool.isRequired,
        toggle:PropTypes.func.isRequired,
    }

    //退出登录
    logout(){
        confirm({
            title:"你确定要退出吗？",
            cancelText:"取消",
            okText:"确认",
            onOk:()=>{
                checkLogOut().then(result=>{
                    // console.log(result);
                    if(result && result.status===1){
                        removeUser()
                        message.success(result.msg)
                        this.props.history.replace("/login")
                    }else{
                        message.error("请检查网络")
                    }
                })
            }
        })
    }
    render() {
        return (
            <Header className="header" style={{padding:0}}>
            {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,{
                className:"trigger",
                onClick:this.props.toggle
            })}
            <div className="navbar-header">
                <h3 className="navbar-brand">小虎管理系统</h3>
                <div className="navbar-header-right">
                    <img width="50" src={logo} alt=""/>
                    <Button type="danger" className="exit-btn" onClick={ e=>this.logout(e) }>退出</Button>
                </div>
            </div>
        </Header>
        )
    }
}
export default withRouter( RightHeader )
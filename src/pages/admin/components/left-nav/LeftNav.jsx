import React, { Component } from 'react'
import { Link } from "react-router-dom"
import menus from "./config/menuConfig.json"
import "./LeftNav.css"
import "./fonts/iconfont.css"

import { getUser } from "../../../../api/adminApi"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"


import PubSub from "pubsub-js"
//导航菜单相关
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;
class LeftNav extends Component {
    static PropoTypes ={
        collapsed:PropTypes.bool.isRequired
    }
    constructor() {
        super()
        this.state = {
            menuList: menus,
            account_icon : getUser().account_name,
            account_name : getUser().account_icon,  
        }
        
    }
    //渲染导航侧边栏
    menuRender(menuList) {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item._key}>
                        <Link to={item._key}>
                            <span className={item.icon}></span>
                            <span style={ this.props.collapsed ? { display:"none" }:{} }> {item.title} </span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item._key} title={
                        <span>
                            <span className={item.icon}></span>
                            <span style={ this.props.collapsed ? { display:"none" }:{} }>{item.title}</span>
                        </span>
                    }>
                        { this.menuRender(item.children)}
                    </SubMenu>
                )
            }
        })

    }
    //点击头像跳转修改页
    handle(){
        this.props.history.replace("/setting/account")
    }
     // 查找需要让哪个Submenu展开
     _getOpenKeys(menuList,path){
        for(let i=0; i<menuList.length; i++){
            let item = menuList[i]
            if(item.children && item.children.find(c_item=>c_item._key === path)){
                return item._key
            }
        }
    }

    render() {
        let { account_icon,account_name ,menuList} = this.state
     
        let path = this.props.location.pathname; // 获取当前的路由
        // console.log(path);
        // console.log(path.indexOf("/",2));
        // console.log(path.substr(0, path.indexOf("/",2)));
        let ppath = path.substr(0, path.indexOf("/",2)) ? path.substr(0, path.indexOf("/",2)) : path
        // console.log(ppath);

        let openKeys = this._getOpenKeys(menuList,path)

        return (
            <Sider className="sider" collapsible collapsed={this.props.collapsed}  >
                 <div className="logo"  onClick={ e=>this.handle(e) } >
                    <div className="avatar" >
                        <img src={account_icon} alt=""/>
                    </div>
                    <h4>{account_name}</h4>
                </div>

                <Menu defaultSelectedKeys={[path]}
                      selectedKeys={[path,ppath]}
                      defaultOpenKeys={openKeys}
                       mode="inline" theme="dark"
              
                >
                    {this.menuRender(this.state.menuList)}
                </Menu>
            </Sider>
        )
    }
    componentDidMount(){
          // 订阅
          PubSub.subscribe("changeAdminMsg",()=>{
            this.setState({
                account_name:getUser().account_icon,
                account_icon:getUser().account_name
            })
        })
       
      
    }
}
export default withRouter (LeftNav)
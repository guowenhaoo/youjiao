import React, { Component } from 'react'
import "./css/login.css"
import logo from "./images/logo.png"
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { checkLogin,saveUser } from "../../api/adminApi"

export default class Login extends Component {
    render() {
        const onFinish = (values) => {
            // console.log('Received values of form: ', values);
            checkLogin(values.account,values.password).then(result=>{
                // console.log(result);
               if(result && result.status===1){
                   message.success(result.msg)
                //把数据存储到本地
                saveUser(result.data)
                //跳到后台首页面
                this.props.history.replace("/")
               }else if(result && result.status===0){
                   message.error(result.msg)
               }else{
                   message.error("请检查网络")
               }

            }).catch(err=>{
                message.error("服务器内部错误")

            })
        };
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src={logo} alt="" />
                    </div>
                    <div className="content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="account"
                            rules={[{ required: true, message: '请输入账户名' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Account" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">登录 </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </div>
            </div>
        )
    }
}

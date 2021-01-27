import React, { Component } from 'react'
import { Card, Form, Input, Modal, Button, message, Upload } from 'antd';
import { LockOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import config from "../../../config/config"
import { getUser, saveUser, changeAdminPwd, changeAmdinMsg } from "../../../api/adminApi"
import PubSub from "pubsub-js"
// 当图片从电脑磁盘到浏览器中，会走beforeUpload
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('上传头像的格式必须是png或者jpg格式！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('上传头像的大小不能超过2M');
    }

    return isJpgOrPng && isLt2M;
}
export default class AccountSetting extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            account: "",//账户名
            account_name: "",//昵称
            account_icon: "", // 管理员的头像
            token: "",//令
            loading: false,
        }
        this.formRef = React.createRef()
    }
    //控制修改密码栏显示
    showModal() { this.setState({ show: true }) }
    //控制修改密码栏隐藏
    handleCancel() { this.setState({ show: false }) }
    // 当图片从浏览器上传到服务器，会有不同的状态，此函数可以监听状态的变化
    // 当图片从浏览器上传到服务器，会有不同的状态，此函数可以监听状态的变化
    handleChange = info => {
        // 表示图片正在上传
        if (info.file.status === 'uploading') {
            // 如果图片在处于上传的状态，loading设置为true
            this.setState({ loading: true });
            return;
        }
        // 表示图片上传完成  得到服务器给出响应
        // info.file.response  得到服务器的响应
        // console.log(info.file.response);
        if (info.file.status === 'done') {
            message.success("头像上传成功")
            let imgUrl = config.BASE_URL + info.file.response.data.name;
            this.setState({
                loading: false,
                account_icon: imgUrl
            }, () => {
                console.log(this.state.account_icon);
            })
        }
    };
    render() {
        const { loading, account_icon } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        //收集表单数据
        const onFinish = (values) => {
            //console.log('Success:', values);
            if (!this.state.show) {
                let { token, account_icon } = this.state;
                changeAmdinMsg(token, account_icon, values.account_name).then(result => {
                    //console.log(result);
                    if (result && result.status === 1) {
                        saveUser(result.data)
                        message.success(result.msg)
                        // 发布
                        PubSub.publish("changeAdminMsg")
                    }
                }).catch(err => {
                    message.error("更新用户信息失败")
                })
            } else {
                // console.log('Success:', values);
                changeAdminPwd(this.state.token, values.old_password, values.new_password)
                    .then(result => {
                        console.log(result);
                        if (result && result.status === 1) {
                            message.success(result.msg)
                            this.props.history.push("/login")
                        }
                    }).catch(err => {
                        message.error("请检查网络")
                    })
            }
        };
        //input宽度
        const layout = { labelCol: { span: 3, }, wrapperCol: { span: 16 } };
        return (
            <div>
                <Card title="管理员信息编辑" style={{ width: "100% " }}>
                    <Form {...layout} onFinish={onFinish} ref={this.formRef}>
                        <Form.Item label="账户名" name="account" >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="管理员名称" name="account_name"
                            rules={[{ required: true, message: '请输入管理员信息' }]}>
                            <Input placeholder="请添加您的昵称" />
                        </Form.Item>
                        <Form.Item label="管理员头像" name="account_icon">
                            <Upload
                                name="admin_avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="/api/auth/admin/upload_admin_icon"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {account_icon ? <img src={account_icon} alt="" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>

                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit"> 修改
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;或者
                            <span style={{ color: "#1890ff" }} onClick={e => this.showModal(e)} href="#">&nbsp;&nbsp; 修改密码？</span>
                        </Form.Item>
                    </Form>
                </Card>

                {/* 修改密码？ */}
                <Modal title="修改密码" visible={this.state.show}
                    onCancel={e => this.handleCancel(e)}
                    footer={null}>
                    <Form {...layout} onFinish={onFinish}>
                        <Form.Item name="old_password"
                            rules={[{ required: true, message: '密码不能为空' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入旧密码" />
                        </Form.Item>
                        <Form.Item name="new_password"
                            rules={[{ required: true, message: '新密码不能为空' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入新密码" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit"> 修改</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )

    }
    componentDidMount() {
        //  console.log("getuser:",getUser());
        this.setState({
            account: getUser().account,//账户名
            account_name: getUser().account_icon,//昵称
            account_icon: getUser().account_name,//头像
            token: getUser().token
        }, () => {
            let { account, account_name } = this.state
            this.formRef.current.setFieldsValue({
                account,
                account_name
            })
        })
    }
}

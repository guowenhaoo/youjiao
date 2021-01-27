import React, { Component } from 'react'
import {Card, Form, Input, Button, message} from 'antd'

import { getWebSiteMsg, editWebSiteMsg} from "../../../api/homeApi"
import { getUser } from "../../../api/adminApi"
import UploadImg from '../../../components/UploadImg'
const {TextArea} = Input;

export default class SiteSetting extends Component {
    constructor(){
        super();
        this.state = {
            siteLogoUrl:""
        }
        this.homeFormRef = React.createRef();
    }
    componentDidMount(){
        getWebSiteMsg().then(result=>{
            // console.log(result);
            if(result && result.status === 1){
                let siteInfo = result.data[0];
                if(siteInfo){
                    this.homeFormRef.current.setFieldsValue(siteInfo)
                    this.setState({
                        siteLogoUrl:siteInfo.site_logo
                    })
                }
            }
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 12 }
            },
        };
        let onFinish = values =>{
            let {siteLogoUrl} = this.state;

            editWebSiteMsg(getUser().token,values.site_name, values.site_keyword, values.site_des, siteLogoUrl, values.site_copy, values.site_bei).then(result=>{
                // console.log(result);
                if(result && result.status === 1){
                    message.success("修改网站信息成功")
                    this.props.history.goBack();
                }
            }).catch(err=>{
                message.err("修改网站信息失败")
            })
        }
        let {siteLogoUrl} = this.state;
        return (
            <Card title="修改网站配置信息">
                <Form  {...formItemLayout} onFinish={onFinish} ref={this.homeFormRef}>
                    <Form.Item
                        label={"网站标题"}
                        name="site_name"
                        rules={[{ required: true, message: '请输入网站标题!' }]}
                    >
                        <Input placeholder={"请输入网站标题"} />
                    </Form.Item>
                    <Form.Item
                        label={"关键字"}
                        name="site_keyword"
                        rules={[{ required: true, message: '请输入网站关键字!' }]}
                    >
                        <TextArea placeholder={"请输入网站关键字"} rows={2} />
                    </Form.Item>
                    <Form.Item
                        label={"描述"}
                        name="site_des"
                        rules={[{ required: true, message: '请输入网站描述!' }]}
                    >
                        <TextArea placeholder={"请输入网站描述"} rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="网站LOGO"
                        name="site_job"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传LOGO"}
                            upLoadName={"site_job_img"}
                            upImage={siteLogoUrl}
                            upLoadAction={"/api/auth/home/upload_home"}
                            successCallBack={(name) => {
                                this.setState({
                                    siteLogoUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"版权信息"}
                        name="site_copy"
                        rules={[{ required: true, message: '请输入网站版权信息!' }]}
                    >
                        <Input placeholder={"请输入网站版权信息"} />
                    </Form.Item>
                    <Form.Item
                        label={"备案号"}
                        name="site_bei"
                        rules={[{ required: true, message: '请输入网站备案号!' }]}
                    >
                        <Input placeholder={"请输入网站备案号"} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 16 }}
                    >
                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                            <Button type={"primary"} htmlType="submit" style={{ marginRight: 15 }}>
                                立即提交
                            </Button>
                            <Button onClick={() => { this.props.history.goBack() }}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

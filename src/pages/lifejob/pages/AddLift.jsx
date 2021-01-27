import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, message } from 'antd'
import Moment from "moment"
import { getJobPre, getJobFamily, addJob } from "../../../api/lifejobApi"
import LikeUploadImg from './../../../components/UploadImg'
import RichTextEditor from './../../../components/rich-text-editor'
import { getUser } from "../../../api/adminApi"
const { Option } = Select;

export default class AddLift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "", // 直播封面
            focusImgUlr: "", // 首页轮播图
            job_pre_edu: [],
            job_famil: []
        }
        this.job_content_ref = React.createRef()
    }
    componentDidMount() {
        //获取适
        getJobPre().then(result => {
            // console.log(result);
            if (result && result.status === 1) {
                this.setState({
                    job_pre_edu: result.data
                })
            }
        })
        //获取适
        getJobFamily().then(result => {
            console.log(result);
            if (result && result.status === 1) {
                this.setState({
                    job_famil: result.data
                })
            }
        })
    }


    render() {
        const formItemLayout = { labelCol: { xs: { span: 3 } }, wrapperCol: { xs: { span: 12 } }, };
        let { job_content, job_pre_edu, job_famil } = this.state
        const onFinish = values => {
            let { imageUrl, focusImgUlr } = this.state
            let job_time = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
            //收集富文本数据
            let job_content = this.job_content_ref.current.getContent()
            console.log(values);
            console.log(imageUrl, focusImgUlr, job_content);
            addJob(getUser().token, values.job_name, imageUrl,values.job_author, job_time,job_content, values.job_pre_edu_id,  values.job_family_edu_id,focusImgUlr)
            .then(result=>{
                console.log(result);
                if(result.status===1){
                    message.success(result.msg)
                    this.props.history.goBack()
                }
            }).catch(err=>{
                message.error("添加失败")
            })

        }

        return (
            <Card title="新增人生资源">
                <Form  {...formItemLayout} onFinish={onFinish} ref={this.formRef}>
                    <Form.Item
                        label={"人生名称"}
                        name="job_name"
                        rules={[{ required: true, message: '请输入职场人生名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"人生作者"}
                        name="job_author"
                        rules={[{ required: true, message: '请输入作者姓名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="学前所属分类"
                        name="job_pre_edu_id"
                        rules={[{ required: true, message: '请选择学前所属分类!' }]}
                    >
                        <Select placeholder={"请选择学前所属分类"} style={{ width: 200 }}>
                            {
                                job_pre_edu.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.pre_edu_name}</Option>
                                    )
                                })

                            }

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属家园分类"
                        name="job_family_edu_id"
                        rules={[{ required: true, message: '请选择所属家园分类!' }]}
                    >
                        <Select placeholder={"请选择所属家园分类"} style={{ width: 200 }}>
                            {
                                job_famil.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.job_family_name}</Option>
                                    )
                                })

                            }

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="人生封面图"
                        name="job_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl) => {
                                this.setState({
                                    imageUrl: imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="焦点图"
                        name="focus_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl) => {
                                this.setState({
                                    focusImgUlr: imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="职场人生内容"
                        name="job_content"
                        wrapperCol={{ span: 20 }}
                    // rules={[{ required: true, message: '请输入职场人生内容!' }]}
                    >
                        <RichTextEditor ref={this.job_content_ref}
                            uploadName="job_content"
                            uploadAction="/api/auth/lifejob/upload_life_job"
                            htmlContent={job_content}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 16 }}
                    >
                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                            <Button type={"primary"} htmlType="submit" style={{ marginRight: 15 }}>保存</Button>
                            <Button onClick={() => { this.props.history.goBack() }}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

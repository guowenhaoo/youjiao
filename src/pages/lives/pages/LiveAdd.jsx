import React, { Component } from "react"
import { Card, Form, Input, Select, message, Button, DatePicker } from 'antd'
import Moment from "moment"
// // 引入日期中国化
// import locale from 'antd/es/date-picker/locale/zh_CN';
// // 引入富文本编辑器
// import RichTextEdit from "./../../../components/rich-text-editor"
// // 引入tag选择
import UploadImg from './../../../components/UploadImg'
import { getLivePerson, getLiveTheme, addLive } from "../../../api/liveApi"
import { getUser } from "../../../api/adminApi"

const { Option } = Select;
const { RangePicker } = DatePicker;


export default class LiveAdd extends Component {

    constructor(props) {
        super(props);
        this.activities_intro_ref = React.createRef();
        this.activities_trip_ref = React.createRef();
        this.activities_days_ref = React.createRef();
        this.activities_notice_ref = React.createRef();
        this.state = ({
            live_persion: [],//人群
            live_theme: [],//主题
            imageUrl: "", // 直播封面
            focusImgUlr: "", // 首页轮播图
        })
    }
    //input布局
    formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
    };
    componentDidMount() {
        //获取适用人群
        getLivePerson().then(result => {
            //console.log(result);
            if (result && result.status === 1) {
                this.setState({
                    live_persion: result.data
                })
            }
        })
        //获取内容主题
        getLiveTheme().then(result => {
            // console.log(result);
            if (result && result.status === 1) {
                this.setState({
                    live_theme: result.data
                })
            }
        })
    }


    render() {
        let { live_persion, live_theme } = this.state
        const onFinish = values => {
            // console.log(values)
            let { imageUrl, focusImgUlr } = this.state
            let live_begin_time = Moment(values.live_time[0]).format("YYYY-MM-DD HH:mm:ss")
            let live_end_time = Moment(values.live_time[1]).format("YYYY-MM-DD HH:mm:ss")
            // console.log(live_begin_time, live_end_time);
            //添加直播课
            addLive(getUser().token, values.live_title, 
                    values.live_url, values.live_author, 
                    imageUrl, live_begin_time, live_end_time,
                     values.live_price, values.live_person_id, 
                     values.live_theme_id, focusImgUlr)
                .then(result => {
                console.log(result);
                    if(result && result.status===1){
                        message.success(result.msg)
                        this.props.history.goBack()
                    }
                
                }).catch(err => {
                message.error("添加直播课程失败！")
            })
        }
        return (
            <Card title="新增直播课">
                <Form {...this.formItemLayout} onFinish={onFinish}>
                    <Form.Item
                        label="直播课名称"
                        name="live_title"
                        rules={[{ required: true, message: '请输入直播课名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_author"
                        label="直播课作者"
                        rules={[{ required: true, message: '请输入直播课作者!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_price"
                        label="直播课价格"
                        rules={[{ required: true, message: '请输入直播课价格!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="live_time"
                        label="直播课时间"
                        rules={[{ required: true, message: '请输入直播课时间!' }]}
                    >
                        <RangePicker></RangePicker>
                    </Form.Item>
                    <Form.Item
                        label="适用人群"
                        name="live_person_id"
                        rules={[{ required: true, message: '请输入适用人群' }]}
                    >
                        <Select placeholder="请选择适用人群">
                            {
                                live_persion.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.live_person_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="内容主题"
                        name="live_theme_id"
                        rules={[{ required: true, message: '请输入内容主题' }]}
                    >
                        <Select placeholder="请输入内容主题">
                            {
                                live_theme.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.live_theme_title}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="live_url"
                        label="直播课地址"
                        rules={[{ required: true, message: '请输入直播课地址!' }]}
                    >
                        <Input placeholder="请输入直接课地址" />
                    </Form.Item>
                    <Form.Item
                        label="直播课封面图"
                        name="live_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name) => {
                                message.success("直播课程封面上传成功")
                                this.setState({
                                    imageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="首页轮播图"
                        name="focus_img"
                    >
                        <UploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"live_img"}
                            upLoadAction={"/api/auth/live/upload_live"}
                            successCallBack={(name) => {
                                message.success("直播课焦点图上传成功")
                                this.setState({
                                    focusImgUlr: name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 24 }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                保存
                            </Button>
                            <Button onClick={() => {
                                this.props.history.goBack()
                            }}>
                                取消
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

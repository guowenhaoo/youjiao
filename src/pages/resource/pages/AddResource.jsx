import React from 'react'
import { Card, Form, Input, Select, Upload, message, Button } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import {
    addResource,
    getResourceCategory,
    getResourceClasses,
    getResourceFormat,
    getResourceMeta,
    getResourceArea
} from "../../../api/resourceApi"
import LikeUploadImg from './../../../components/UploadImg'

import { getUser } from "../../../api/adminApi";
import Moment from 'moment'
const { Option } = Select;



export default class AddResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            focusImgUlr: "",
            resource_category: [],
            resource_classes: [],
            resource_area: [],
            resource_meta: [],
            resource_format: [],
            dragFileList: [], // 存放上传的文件
        }
    }
    componentDidMount() {
        //获取所属分类
        getResourceCategory().then(result => {
            // console.log(result);
            if (result.status === 1) {
                this.setState({
                    resource_category: result.data
                })
            }
        })
        //获取所属班级
        getResourceClasses().then(result => {
            // console.log(result);
            if (result.status === 1) {
                this.setState({
                    resource_classes: result.data
                })
            }
        })
        //获取所属领域
        getResourceArea().then(result => {
            // console.log(result);
            if (result.status === 1) {
                this.setState({
                    resource_area: result.data
                })
            }
        })
        //获取素材选择
        getResourceMeta().then(result => {
            // console.log(result);
            if (result.status === 1) {
                this.setState({
                    resource_meta: result.data
                })
            }
        })
        //获取素材格式
        getResourceFormat().then(result => {
            // console.log(result);
            if (result.status === 1) {
                this.setState({
                    resource_format: result.data
                })
            }
        })
    }




    render() {
        const formItemLayout = { labelCol: { xs: { span: 2 } }, wrapperCol: { xs: { span: 12 } }, };
        const onFinish = values => {
            let { imageUrl, focusImgUlr, dragFileList } = this.state
            if (!imageUrl) {
                message.warning('请上传资源封面!');
                return;
            }
            console.log(values);
            console.log(imageUrl, focusImgUlr, dragFileList);
            // 1. 生成创建日期
            const resource_publish_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 2. 上传资源
            addResource(getUser().token, values.resource_name, values.resource_author,
                resource_publish_time, dragFileList, values.resource_category_id,
                values.resource_classes_id, values.resource_area_id, values.resource_meta_id,
                values.resource_format_id, imageUrl, values.resource_price, focusImgUlr)
                .then((result) => {
                    console.log(result)
                    if (result && result.status === 1) {
                        message.success(result.msg);
                        this.props.history.goBack();
                    }
                }).catch(() => {
                    message.error('添加直播课失败!');
                })



        }

        let {imageUrl, focusImgUlr, resource_category, resource_classes, resource_area, resource_meta, resource_format } = this.state
        return (
            <Card title="新增幼教资源">
                <Form  {...formItemLayout} onFinish={onFinish}>
                    <Form.Item
                        label={"资源名称"}
                        name="resource_name"
                        rules={[{ required: true, message: '请输入资源名称!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"资源作者"}
                        name="resource_author"
                        rules={[{ required: true, message: '请输入作者姓名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="所属分类"
                        name="resource_category_id"
                        rules={[{ required: true, message: '请选择所属分类!' }]}
                    >
                        <Select style={{ width: 200 }}>
                            {
                                resource_category.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.category_name}</Option>
                                    )
                                })

                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属班级"
                        name="resource_classes_id"
                        rules={[{ required: true, message: '请选择所属分类!' }]}
                    >
                        <Select style={{ width: 90 }}>
                            {
                                resource_classes.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.classes_name}</Option>
                                    )
                                })

                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属领域"
                        name="resource_area_id"
                        rules={[{ required: true, message: '请选择所属领域!' }]}
                    >
                        <Select style={{ width: 90 }}>
                            {
                                resource_area.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.area_name}</Option>
                                    )
                                })

                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材选择"
                        name="resource_meta_id"
                        rules={[{ required: true, message: '请选择素材!' }]}
                    >
                        <Select style={{ width: 120 }}>
                            {
                                resource_meta.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.mate_name}</Option>
                                    )
                                })

                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材格式"
                        name="resource_format_id"
                        rules={[{ required: true, message: '请选择素材格式!' }]}
                    >
                        <Select style={{ width: 120 }}>
                            {
                                resource_format.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.format_name}</Option>
                                    )
                                })

                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={"资源价格"}
                        name="resource_price"
                        rules={[{ required: true, message: '请输入资源的价格!' }]}
                    >
                        <Input placeholder={'免费则输入零'} style={{ width: 120 }} />
                        {/* <span>
                            <span style={{ marginLeft: 5 }}>元</span>
                            <span style={{ color: 'red' }}>(免费则输入0)</span>
                        </span> */}
                    </Form.Item>
                    <Form.Item
                        label={"资源封面图"}
                        name="resource_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upImage={imageUrl}
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl) => {
                                this.setState({
                                    imageUrl: imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"首页轮播图"}
                        name="focus_img"
                    >
                        <LikeUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upImage={focusImgUlr}
                            upLoadAction={"/api/auth/lifejob/upload_life_job"}
                            successCallBack={(imgUrl) => {
                                this.setState({
                                    focusImgUlr: imgUrl
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"幼教资源"}
                        name="resource_content"
                    >
                        <Upload.Dragger
                            name='resource_file'
                            multiple={true}
                            action={'/api/auth/resource/upload_many_file'}
                            onChange={(info) => {
                                const { status } = info.file;
                                if (status !== 'uploading') {
                                    // console.log(info.file, info.fileList);
                                }
                                if (status === 'done') {
                                    if (info.file.response && info.file.response.status === 1) {
                                        /*
                                        console.log(`-----------------`);
                                        console.log(info.file.response.data);
                                        console.log(`-----------------`);
                                        */

                                        let tempArr = this.state.dragFileList;
                                        tempArr.push(info.file.response.data);
                                        this.setState({
                                            dragFileList: tempArr
                                        }, () => {
                                            console.log(this.state.dragFileList);
                                        })
                                    }
                                    message.success(`${info.file.name} 文件上传成功!`);
                                } else if (status === 'error') {
                                    message.error(`${info.file.name} 文件上传失败!`);
                                }
                            }}
                            onRemove={(file) => {
                                console.log(file);
                                let tempArr = this.state.dragFileList;
                                let newTempArr = [];
                                for (let i = 0; i < tempArr.length; i++) {
                                    if (tempArr[i].uid !== file.response.data.uid) {
                                        newTempArr.push(tempArr[i]);
                                    }
                                }
                                // 更新状态
                                this.setState({
                                    dragFileList: newTempArr
                                }, () => {
                                    console.log(this.state.dragFileList);
                                })
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">单击或者拖到文件到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或多上文件上传</p>
                        </Upload.Dragger>

                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ span: 16 }}
                    >
                        <div style={{ textAlign: 'center', marginTop: 30 }}>
                            <Button type={"primary"} htmlType='submit' style={{ marginRight: 15 }}>保存</Button>
                            <Button onClick={() => { this.props.history.goBack() }}>取消</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
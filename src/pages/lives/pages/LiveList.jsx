import React, { Component } from 'react'
import {Card, Button, Table, Switch, Divider, Modal, message,notification} from 'antd'
import { getLive,setFocusLive,deleteLive} from "../../../api/liveApi"
import config from "../../../config/config"

export default class LiveList extends Component {
   
    constructor(props) {
        super(props);

        this.state = {
            resourceList: [],
            totalSize: 0,//总条数
            pageSize: 4,//一页显示多少条
           
        }
    }

    // 列的配置信息
    columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', width: 50, align: 'center'},
        {title: '直播课标题', dataIndex: 'live_title', key: 'live_title',align: 'center'},
        {
            title: '直播课封面', dataIndex: 'live_img', key: 'live_img',align: 'center',
            render: (text, record) => {
                return (
                    <img src={ config.BASE_URL+record.live_img} alt="活动封面" width={100}/>
                )
            }
        },
        {title: '开始时间', dataIndex: 'live_begin_time', key: 'live_time',align: 'center'},
        {title: '直播课老师', dataIndex: 'live_author', key: 'live_author',align: 'center'},
        {title: '直播课价格', dataIndex: 'live_price', key: 'live_price',align: 'center'},
        {
            title: '首页焦点', dataIndex: 'is_focus', key: 'is_focus',align: 'center',
            render: (text, record) => {
                return (
                    <Switch 
                    
                        checkedChildren="是" 
                        unCheckedChildren="否"
                        defaultChecked={ record.is_focus === 1 }
                        onChange={(checked)=>{
                            // console.log(checked);
                            setFocusLive(record.id, checked ? 1 : 0).then(result=>{
                                // console.log(result);
                                if(result && result.status === 1){
                                    // message.success(result.msg)
                                    notification["success"]({
                                        message:`课程:${record.live_title}`,
                                        description:`${checked ? "设置为":"取消"}焦点课程`,
                                        duration:2
                                    })
                                }
                            }).catch(err=>{
                                console.log("设置焦点失败");
                            })
                        }}
                    
                    />
                )
            }
        },
        {
            title: '操作', align: 'center',
            render: (text, record) => {
                return (
                    <div>
                        <Button onClick={ ()=>{
                             this.props.history.push({
                                pathname:"/live/edit-live",
                                state:{
                                    live:record
                                }
                            })
                        }
                        }>编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{
                            Modal.confirm({
                                title: '确认删除吗?',
                                content: '删除此资源,所有关联的内容都会被删除',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: ()=> {
                                    // todo
                                    // console.log("text:",text,"record:",record);
                                    deleteLive(record.id).then(result=>{
                                        console.log(result);
                                        if(result && result.status === 1){
                                            message.success(result.msg)
                                            this.getLiveList()
                                        }
                                    })
                                }
                            });
                        }}>删除</Button>
                    </div>
                )
            }
        },
    ];
    componentDidMount(){
        //获取直播列表
        this.getLiveList()
       
    }
    getLiveList(page_num=1, page_size=4){
        getLive(page_num,page_size).then(result=>{
            // console.log(result);
            if(result && result.status === 1){
                message.success(result.msg)
                this.setState({
                    resourceList:result.data.live_list,
                    totalSize:result.data.live_count
                })
            }
        })
    }

    render() {
        // 添加按钮
        let addBtn = (
            <Button type={"primary"} onClick={() => {
                this.props.history.push('/live/add-live');
            }}>
                添加直播课
            </Button>
        );

        return (
            <Card title={"直播课列表"} extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.resourceList}
                    rowKey={"id"}
                    pagination={{
                        total: this.state.totalSize,
                        pageSize: this.state.pageSize,
                        onChange: (pageNum, pageSize)=>{
                            console.log('需要加载' + pageNum, pageSize);
                            this.getLiveList(pageNum,pageSize)
                        }
                    }}
                />
            </Card>
        )
    }
}

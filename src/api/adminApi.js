// 管理员相关的请求都放到adminApi.js中
// 好处：在组件中发送ajax请求，就像调用函数一样

import ajax from "./index"
import { saveObj,getObj,removeObj } from "../tools/cache-tool"
import config from "../config/config"

// 1）登录接口
export const checkLogin=(account,password)=>ajax("/api/auth/admin/login",{account,password},"post")

// 2）退出登录
export const checkLogOut=()=>ajax("/api/auth/admin/logout")

// 3）保存用户信息
export const saveUser = (userObj)=>{ saveObj(config.ADMIN_KEY,userObj) }

// 4）删除用户信息
export const removeUser = ()=>{ removeObj(config.ADMIN_KEY) }

// 5）获取用户信息
export const getUser = ()=>{ return getObj(config.ADMIN_KEY) }

// 6）判断管理是否登录
export const isLogin = ()=>{ let userObj = getObj(config.ADMIN_KEY); return !!userObj; }

// 7）上传管理员头像
// 地址在Upload组件中直接调用了 /api/auth/admin/upload_admin_icon

// 8）修改管理员信息
export const changeAmdinMsg = (token, account_name, account_icon)=>ajax("/api/auth/admin/edit",{token, account_name, account_icon},"post")

// 9）修改管理员的密码
export const changeAdminPwd = (token, old_pwd, new_pwd)=>ajax("/api/auth/admin/reset_pwd",{token, old_pwd, new_pwd},"post")


























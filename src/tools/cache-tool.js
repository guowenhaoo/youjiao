// 此模块是对localstroge的封装  使用需要store模块
import store from "store"

// 保存数据到本地
export const saveObj = (key,obj)=>{
    store.set(key,obj)
}
// 从本地获取数据
export const getObj = (key)=>{
    return store.get(key) || ""
}
// 把本地的数据删除掉
export const removeObj = (key)=>{
    store.remove(key)
}


import { combineReducers } from "redux"
import { routerReducer } from 'react-router-redux';
import name from "./name"
import age from "./age"
//合并reducer
export default combineReducers({
  name,
  age,
  routing: routerReducer //使用react-router-redux提供的reducer来管理路由更新
})

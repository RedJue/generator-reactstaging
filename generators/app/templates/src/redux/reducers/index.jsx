import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux';
//合并reducer
export default combineReducers({
  routing: routerReducer //使用react-router-redux提供的reducer来管理路由更新
})
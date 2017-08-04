//创建store
import {createStore } from 'redux';
import reducers from 'reducers/index';
import middleware from 'store/middleware';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';//browserHistory打包有问题 不能用

const store = createStore(reducers,{}, middleware)//创建store
const history = syncHistoryWithStore(hashHistory, store);//使用redux来加强react-router的history 让他能同步与redux的状态更新
export {
    store,
    history
}
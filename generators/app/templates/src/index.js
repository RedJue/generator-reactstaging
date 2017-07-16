require("./css/app.scss") //引入样式
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/app';//起始框架页面
import Home from './components/home';//默认首页路由页面
import { Provider } from "react-redux";
import store from "./store";
const app = document.getElementById('App');
const history = syncHistoryWithStore(hashHistory, store);//使用redux来加强react-router的history 让他能同步与redux的状态更新
ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
  </Provider>,
  app
);

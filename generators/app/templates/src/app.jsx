// 应用入口
import React, { Component } from 'react';
import { render } from 'react-dom';
import RoutesCombine from 'routes';
//import 'normalize.css';//重置样式
import './css/common.scss'// 重置浏览器默认样式
//渲染组件
render((
<RoutesCombine />
), document.getElementById('app'));



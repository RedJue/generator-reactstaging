import React, { Component } from 'react';
import { store, history } from 'store/index';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Provider } from 'react-redux';
import Topbar from 'pages/Topbar';//导航栏
import page1 from 'pages/routes/page1';
import page2 from 'pages/routes/page2';
import page3 from 'pages/routes/page3';

//lazyLoadFunction 将bundle-loader编译过的路由函数进行解析
let lazyLoadComponent = (lazyModule) => {
    return (location, cb) => {
        lazyModule(module => cb(null, module.default));
    }
}

export default class RoutesCombine extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={Topbar}>
                        <IndexRoute getComponent={lazyLoadComponent(page1)} />
                        <Route path="page1" getComponent={lazyLoadComponent(page1)}></Route>
                        <Route path="page2" getComponent={lazyLoadComponent(page2)}></Route>
                        <Route path="page3" getComponent={lazyLoadComponent(page3)}></Route>
                    </Route>
                </Router>
            </Provider>
        )
    }
}

//中间件在这里加载
import { applyMiddleware} from "redux"

import logger from "redux-logger"//用来查看从接受action 到用reducer处理状态的一系列过程
import thunk from "redux-thunk"//redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数,可以用来处理异步请求
import promise from "redux-promise-middleware"//对redux-thunk异步处理进行简化

export default applyMiddleware(promise(),thunk, logger())//创建一些中间件
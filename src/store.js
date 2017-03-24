import { applyMiddleware, createStore } from "redux"
//import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import allReducers from "./reducers"

process.env.NODE_ENV === 'production'

//const middleware = applyMiddleware(promise(), thunk, logger())
const middleware = applyMiddleware(promise(), thunk)

export default createStore(allReducers, middleware)

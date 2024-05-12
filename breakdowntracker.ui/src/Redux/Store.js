import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import { BreakdownReducer } from "./Reducer";

const rootreducer=combineReducers({breakdown:BreakdownReducer})
const middleware =[thunk,logger];
const breakdownstore=configureStore({reducer:rootreducer,middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger)})

export default breakdownstore;
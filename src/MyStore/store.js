import { applyMiddleware, createStore } from "redux";
import { UISetter } from "./reducer";
import thunk from "redux-thunk";
import { combineReducer } from "./combineStore";

export const MyStore = createStore(combineReducer, applyMiddleware(thunk))
import { combineReducers } from "redux";
import { DataSetter, SearchSetter, UISetter, UserSetter, WarningSettter } from "./reducer";

export const combineReducer = combineReducers({
    UISetter: UISetter,
    UserSetter: UserSetter,
    DataSetter: DataSetter,
    WarningSetter: WarningSettter,
    SearchSetter: SearchSetter
})
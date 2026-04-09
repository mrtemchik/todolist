import {combineReducers} from "redux";
import {todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/AppWithRedux/app-reducer";
import {AuthReducer} from "../features/Login/login-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: AuthReducer
})

export  const store=configureStore({
    reducer:rootReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch=useDispatch.withTypes<AppDispatch>();
export const useAppSelector=useSelector.withTypes<AppRootState>()
// @ts-ignore
window.store = store;

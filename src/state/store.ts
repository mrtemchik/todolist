import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import { todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export  const store=createStore(rootReducer,applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
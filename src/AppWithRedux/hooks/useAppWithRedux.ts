import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolist-reducer";
import {FilterValuesType, TaskStateType, TodolistType} from "../AppWithRedux";
import {useCallback, } from 'react';

const useAppWithRedux = () => {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)


    const removeTask= useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId));
    },[dispatch]);

    const addTask= useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId));
    },[dispatch]);

    const changeStatus= useCallback(function (id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    },[dispatch]);

    const changeTaskTitle= useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    },[dispatch]);

    const changeFilter= useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId));
    },[dispatch]);

    const removeTodolist = useCallback( (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);

    const changeTodolistTitle =useCallback ((id: string, newTitle: string)=> {
        dispatch(changeTodolistTitleAC(id, newTitle));
    }, [dispatch]);

    return {todolists, addTodolist,tasks,changeStatus,removeTask,changeFilter,addTask,changeTaskTitle,removeTodolist,changeTodolistTitle}
}
export default useAppWithRedux
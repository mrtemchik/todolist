import {
    addTaskTC,
    removeTaskTC, updateTaskTC
} from "../../../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC,
} from "../../../state/todolist-reducer";
import  {useCallback, useEffect} from 'react';
import {TaskStatuses} from "../../../api/todolists-api";

const useAppWithRedux = () => {

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn= useAppSelector(state => state.auth.isLoggedIn);
    useEffect(()=>{
        if(!isLoggedIn){
        return;
        }
       dispatch(fetchTodolistsTC());
    },[dispatch, isLoggedIn])

    const removeTask= useCallback(function (id: string, todolistId: string) {
     dispatch(removeTaskTC(id, todolistId))
    },[dispatch]);

    const addTask= useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    },[dispatch]);

    const changeStatus= useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, {status}, todolistId));
    },[dispatch]);

    const changeTaskTitle= useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(id, {title:newTitle}, todolistId));
    },[dispatch]);

    const changeFilter= useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC({id:todolistId, filter: value}));
    },[dispatch]);

    const removeTodolist = useCallback( (todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    },[dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const changeTodolistTitle =useCallback ((id: string, newTitle: string)=> {
        dispatch(changeTodolistTitleTC(id, newTitle));
    }, [dispatch]);


    return {todolists, addTodolist,tasks,changeStatus,removeTask,changeFilter,addTask,changeTaskTitle,removeTodolist,changeTodolistTitle}
}
export default useAppWithRedux
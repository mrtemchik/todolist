import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpanType";
import {Button, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../../../state/todolist-reducer";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {fetchTasksTC} from "../../../state/tasks-reducer";
import {Navigate} from "react-router-dom";


type PropsType = {
    todolist:TodolistDomainType;
    tasks: Array<TaskType>;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    removeTodoList: (TodolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
}


export const Todolist = React.memo(function(props: PropsType) {

    const dispatch = useAppDispatch();
    const isLoggedIn= useAppSelector(state => state.auth.isLoggedIn);
    useEffect(()=>{

        dispatch(fetchTasksTC(props.todolist.id));
    },[dispatch, isLoggedIn, props.todolist.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id),[props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id),[props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id),[props]);

    const removeTodoList = () => {
        props.removeTodoList(props.todolist.id);
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle);
    },[props]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    },[props]);

    let tasksForTodolist= props.tasks;
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <div>
                {
                    
                    tasksForTodolist.map(t =><Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.todolist.id}
                        key={t.id}
                        />)
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.todolist.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"info"} variant={props.todolist.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"success"} variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


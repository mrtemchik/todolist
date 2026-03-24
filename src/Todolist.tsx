import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpanType";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolist-reducer";


type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    removeTask: (id: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (TodolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
}


export const Todolist = React.memo(function(props: PropsType) {

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props]);

    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    },[props]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    },[props.addTask, props.id]);

    let tasksForTodolist= props.tasks;
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(t =><Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={t.id}
                        />)
                }
            </div>
            <div>
                <Button color={"inherit"} variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"info"} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"success"} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})


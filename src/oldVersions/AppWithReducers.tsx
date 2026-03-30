import React, {useReducer} from 'react';
import '../app/App.css';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistReducer,
    changeTodolistTitleAC,
    addTodolistAC, FilterValuesType
} from "../state/todolist-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer, updateTaskTC} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {todolistId1, todolistId2} from "./App/id-utils";



function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:"", order:0,entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:"", order:1,entityStatus:"idle"}
    ]);

    let [tasksObj, dispatchToTaskReduser] = useReducer(tasksReducer, {});

    function removeTask(id: string, todolistId: string) {
        dispatchToTaskReduser(removeTaskAC(id, todolistId));
    }

    // function addTask(title: string, todolistId: string) {
    //     dispatchToTaskReduser(addTaskAC(title, todolistId));
    // }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTaskReduser(updateTaskAC(id, {status}, todolistId));
    }

    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     const action = updateTaskTC(id, {title:newTitle}, todolistId);
    //     dispatchToTaskReduser(action);
    // }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
    }


    let removeTodolist = (todolistId: string) => {
        dispatchToTaskReduser(removeTodolistAC(todolistId));
        dispatchToTodolistsReducer(removeTodolistAC(todolistId));
    }


    // function addTodolist(title: string) {
    //     dispatchToTaskReduser(addTodolistAC(title));
    //     dispatchToTodolistsReducer(addTodolistAC(title));
    // }

    function changeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Я люблю Заю(Ксюшу)
                    </Typography>
                    <Button color={"inherit"}>Login </Button>
                </Toolbar>
            </AppBar>
            {/*<Container fixed style={{padding: "20px"}}>*/}
            {/*    <Grid container>*/}
            {/*        <AddItemForm addItem={(title: string) => {*/}
            {/*            addTodolist(title)*/}
            {/*        }}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container spacing={3}>*/}
            {/*        {*/}
            {/*            todolists.map((tl) => {*/}
            {/*                let tasksForTodolist = tasksObj[tl.id];*/}
            {/*                if (tl.filter === "completed") {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)*/}
            {/*                }*/}
            {/*                if (tl.filter === "active") {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)*/}
            {/*                }*/}
            {/*                return <Grid>*/}
            {/*                    <Paper style={{padding: "10px"}}>*/}
            {/*                        <Todolist*/}
            {/*                            key={tl.id}*/}
            {/*                            id={tl.id}*/}
            {/*                            title={tl.title}*/}
            {/*                            tasks={tasksForTodolist}*/}
            {/*                            removeTask={removeTask}*/}
            {/*                            changeFilter={changeFilter}*/}
            {/*                            addTask={addTask}*/}
            {/*                            changeTaskStatus={changeStatus}*/}
            {/*                            changeTaskTitle={changeTaskTitle}*/}
            {/*                            filter={tl.filter}*/}
            {/*                            removeTodoList={removeTodolist}*/}
            {/*                            changeTodolistTitle={changeTodolistTitle}*/}
            {/*                        />*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </Grid>*/}
            {/*</Container>*/}

        </div>
    );
}

export default AppWithReducer;

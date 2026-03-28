import React from 'react';
import '../../app/App.css';
import {Todolist} from "../../Todolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TaskStatuses, TaskType} from "../../api/todolists-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const {
        tasksObj,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist,
    } = useTasks();

    let {
        todolists,
        changeFilter,
        removeTodolist,
        addTodolist,
        changeTodolistTitle,
    } = useTodolists(completelyRemoveTasksForTodolist, addStateForNewTodolist);




    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color={"inherit"}>Login </Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{padding: "20px"}}>
                <Grid container>
                    <AddItemForm addItem={(title: string) => {
                        addTodolist(title)
                    }}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.InProgress)
                            }
                            return <Grid>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

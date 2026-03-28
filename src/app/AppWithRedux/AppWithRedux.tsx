import '../App.css';
import { Todolist} from "../../Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../../api/todolists-api";
import {ErrorSnackbar} from "../../components/ErrosSnackBar/ErrosSnackbar";
import {useAppSelector} from "../../state/store";
import useAppWithRedux from "./hooks/useAppWithRedux";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const status= useAppSelector(state=>state.app.status)
    const {todolists,addTodolist,tasks,changeStatus, removeTask,changeFilter,addTask,changeTaskTitle,removeTodolist,changeTodolistTitle }= useAppWithRedux()
    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status==='loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{padding: "20px"}}>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            const allTodolistTasks = tasks[tl.id];

                            return <Grid key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
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

export default AppWithRedux;

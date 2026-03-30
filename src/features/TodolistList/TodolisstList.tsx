import useAppWithRedux from "../../app/AppWithRedux/hooks/useAppWithRedux";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";

export const Todolists: React.FC = (props) => {
    const {
        todolists,
        addTodolist,
        tasks,
        changeStatus,
        removeTask,
        changeFilter,
        addTask,
        changeTaskTitle,
        removeTodolist,
        changeTodolistTitle
    } = useAppWithRedux()

    return (
        <><Grid container>
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
        </>)

}
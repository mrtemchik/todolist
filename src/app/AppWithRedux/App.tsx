import '../App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../../components/ErrosSnackBar/ErrosSnackbar";
import {useAppSelector} from "../../state/store";
import {Todolists} from "../../features/TodolistList/TodolisstList";


function App() {
     const status = useAppSelector(state => state.app.status);
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{padding: "20px"}}>
                <Todolists/>
            </Container>
        </div>
    );
}


export default App;

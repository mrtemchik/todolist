import '../App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../../components/ErrosSnackBar/ErrosSnackbar";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Todolists} from "../../features/TodolistList/TodolisstList";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from "../../features/Login/Login";
import {CircularProgress} from "@mui/joy";
import {useCallback, useEffect} from "react";
import {InitializeAppTC} from "./app-reducer";
import {logoutTC} from "../../features/Login/login-reducer";



function App() {
    const status = useAppSelector(state => state.app.status);
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(InitializeAppTC());
    }, [dispatch])

    const logoutHandler=useCallback(()=>{
        dispatch(logoutTC())
    },[dispatch])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', width: '100%', textAlign: 'center', top: "50%"}}><CircularProgress/></div>
    }


    return (
        <BrowserRouter>
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
                        <Button color={"inherit"} onClick={logoutHandler}>Log out </Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed style={{padding: "20px"}}>
                    <Routes>
                        <Route path="/" element={<Todolists/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;

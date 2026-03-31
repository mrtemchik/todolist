import React from 'react'
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {FormControl} from "@mui/joy";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {loginTC} from "./login-reducer";
import { Navigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state=>state.auth.isLoggedIn);

    const formik = useFormik({
        validate:(values)=>{
            if(!values.email){
                return {
                    email:'email is required',
                }
            }
            if(!values.password){
                return {
                    email:'password is required',
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(loginTC(values));
        }
    })
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return <Grid container justifyContent={"center"}>
        <Grid size={{xs: 4}}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <FormGroup>
                            <FormLabel>
                                <p>
                                    <a href={'https://social-network.samuraijs.com/'}>Log in here</a>
                                </p>
                                <p>
                                    or use free account for tests
                                </p>
                                <p>
                                    Email: free@samuraijs.com
                                </p>
                                <p>
                                    Password: free
                                </p>
                            </FormLabel>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email ?<div>{formik.errors.email}</div>:null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password ?<div>{formik.errors.password}</div>:null}
                            <FormControlLabel
                                control={<Checkbox
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}/>}
                                label={"Remember me"}/>
                            <Button type="submit" color="primary">Login</Button>
                        </FormGroup>
                    </FormLabel>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
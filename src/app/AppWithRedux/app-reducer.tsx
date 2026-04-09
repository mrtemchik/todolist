import {Dispatch} from "redux";
import {authApi} from "../../api/todolists-api";
import {setIsLoggedInAC} from "../../features/Login/login-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}

//actionCreators
const slice = createSlice({
    name:"app",
    initialState: initialState,
    reducers:{
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>){
            state.status= action.payload.status;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>){
            state.error= action.payload.error;
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized;
        }
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC,setAppErrorAC,setAppInitializedAC} = slice.actions;

//thunkCreators
export const InitializeAppTC=()=>(dispatch:Dispatch)=>{
authApi.me().then((res)=>{
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC({value:true}))
        }
        else{
        }
    dispatch(setAppInitializedAC({isInitialized:true}))
    })
}

//types
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
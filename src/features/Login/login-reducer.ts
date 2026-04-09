import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/AppWithRedux/app-reducer";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};

const slice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>){
            state.isLoggedIn= action.payload.value;
        }
    }
})

export const AuthReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;



//thunkCreators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedInAC({value:true}))
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else
                handleServerAppError(res.data, dispatch);
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch);
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggedInAC({value:false}))
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else
                handleServerAppError(res.data, dispatch);
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch);
        })
}



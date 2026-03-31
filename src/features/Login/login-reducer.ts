import {Dispatch} from "redux";
import {SetAppActionType, setAppStatusAC} from "../../app/AppWithRedux/app-reducer";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState:InitialStateType = {
    isLoggedIn: false,
};

export const AuthReducer = (state:InitialStateType = initialState, action: ActionsType)  => {
    switch (action.type) {
        case "login/SET_IS_LOGGET_IN":
            return {...state, isLoggedIn: action.value};
        default:
            return state;
    }
}


//actionCreators
export const setIsLoggetInAC = (value:boolean) => ({
    type: 'login/SET_IS_LOGGET_IN', value} as const);


//thunkCreators
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggetInAC(true))
                dispatch(setAppStatusAC('succeeded'));
            } else
                handleServerAppError(res.data, dispatch);
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch);
        })
}
export const logoutTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch(setIsLoggetInAC(false))
                dispatch(setAppStatusAC('succeeded'));
            } else
                handleServerAppError(res.data, dispatch);
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch);
        })
}


//types

export type ActionsType =
    |ReturnType<typeof setIsLoggetInAC>

type InitialStateType={
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<ActionsType | SetAppActionType >


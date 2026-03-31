import {Dispatch} from "redux";
import {authApi} from "../../api/todolists-api";
import {setIsLoggetInAC} from "../../features/Login/login-reducer";

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
export const appReducer = (state: InitialStateType = initialState, action: SetAppActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
            case"APP/SET-IS-INITIALIZED":
                return {...state, isInitialized: action.value};
        default:
            return state;
    }
}
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}as const)
export const setAppInitializedAC=(value:boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const InitializeAppTC=()=>(dispatch:Dispatch)=>{
authApi.me().then((res)=>{
        if (res.data.resultCode === 0){
            dispatch(setIsLoggetInAC(true))
        }
        else{
        }
    dispatch(setAppInitializedAC(true))
    })
}

export type SetAppActionType =
    |ReturnType<typeof setAppErrorAC>
    |ReturnType<typeof setAppStatusAC>
    |ReturnType<typeof setAppInitializedAC>;
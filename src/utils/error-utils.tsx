import {SetAppActionType, setAppErrorAC, setAppStatusAC} from "../app/AppWithRedux/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError=(data : ResponseType, dispatch: Dispatch<SetAppActionType>)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('something went wrong'));
    }
dispatch(setAppStatusAC('failed'));
}
export const handleServerNetworkError=(error:any, dispatch: Dispatch<SetAppActionType>)=>{
    debugger
    dispatch(setAppErrorAC(error.message? error.message : 'Some error occurred.'));
    dispatch(setAppStatusAC("failed"));
}
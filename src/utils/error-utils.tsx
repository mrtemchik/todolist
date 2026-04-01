import {setAppErrorAC, setAppStatusAC} from "../app/AppWithRedux/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError=(data : ResponseType, dispatch: Dispatch)=>{
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'something went wrong'}));
    }
dispatch(setAppStatusAC({status:'failed'}));
}
export const handleServerNetworkError=(error:{message:string}, dispatch: Dispatch)=>{
    debugger
    dispatch(setAppErrorAC(error.message? {error:error.message} : {error:'Some error occurred.'}));
    dispatch(setAppStatusAC({status:"failed"}));
}
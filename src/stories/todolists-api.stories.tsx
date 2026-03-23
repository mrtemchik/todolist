import React, {useEffect, useState } from 'react';
import axios from "axios";

export default{
    title:'API'
}

const settings ={
    withCredentials:true,
    headers: {
        "API-KEY" : "3e1be68b-f3fd-4676-b05a-4e3de3ace6bb"
    }
}

export const GetTodolists =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        .then((res)=>{
            setState(res.data);
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "Second todolist"}, settings)
            .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='c01efa15-59bb-47c9-947a-92d45f7ba948'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='c01efa15-59bb-47c9-947a-92d45f7ba948'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "Third todolist"}, settings)
            .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
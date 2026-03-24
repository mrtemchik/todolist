import React, {useEffect, useState } from 'react';
import {todolistsAPI} from "../api/todolists-api";

export default{
    title:'API'
}

export const GetTodolists =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        todolistsAPI.getTodolists()
        .then((res)=>{
            setState(res.data);
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
       todolistsAPI.createTodolist("Todolist")
            .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='624e6c4e-c410-41a9-a74c-d2d227a79b68'
        todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolist =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='76b66fbd-2570-4b14-874b-5fb61e6002e3'
        todolistsAPI.updateTodolist(todolistId, "listTodo")
                    .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='fa10e9ef-f4cd-4600-abb6-609bd05f2606'
        todolistsAPI.getTasks(todolistId)
                    .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='fa10e9ef-f4cd-4600-abb6-609bd05f2606'
        const taskId='4e818d10-e541-4d31-b1aa-6f7d624a88d3'
        todolistsAPI.deleteTask(todolistId, taskId)
                    .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='fa10e9ef-f4cd-4600-abb6-609bd05f2606';
        const taskTitle ='New Task';
        todolistsAPI.createTask(todolistId, taskTitle)
                    .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask =()=>{
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='fa10e9ef-f4cd-4600-abb6-609bd05f2606';
        const taskId='f347b64a-35e0-46f8-8ad6-cd4367a7814f';
        const taskTitle ='Task';
        todolistsAPI.updateTask(todolistId, taskId, {
            title: " title2",
            description: " description2",
            status: 1,
            priority: 2,
            startDate: "",
            deadline: "",
        })
                    .then((res)=>{
                setState(res.data);
            })
    },[])
    return <div>{JSON.stringify(state)}</div>
}
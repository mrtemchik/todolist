import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = (
    onItemAdded:(title:string)=>void
) => {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){
            setError(null);
        }
        if (e.charCode === 13) {
            if (newTaskTitle.trim() === "") {
                setError("Title is required");
                return;
            }
           onItemAdded(newTaskTitle);
            setNewTaskTitle("");
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required");
            return;
        }
       onItemAdded(newTaskTitle);
        setNewTaskTitle("");
    }
    return{
        newTaskTitle,
        onKeyPressHandler,
        onChangeHandler,
        addItem,
        error,
    }
}
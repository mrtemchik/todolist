import React from "react";
import {Button, TextField} from "@mui/material";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
    disabled?:boolean,
}

export const AddItemForm = React.memo( ({addItem, disabled=false}: AddItemFormPropsType)=> {
   const{newTaskTitle,
       onKeyPressHandler,
       onChangeHandler,
       addItemHandler,
       error,
   }=useAddItemForm(addItem);
    return <div>
        <TextField value={newTaskTitle}
                   disabled={disabled}
                   variant={"standard"}
                   label="Type title"
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <Button onClick={addItemHandler} variant={'text'} disabled={disabled}>+</Button>
    </div>
})
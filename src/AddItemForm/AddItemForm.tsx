import React from "react";
import {Button, TextField} from "@mui/material";
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType)=> {
   const{newTaskTitle,
       onKeyPressHandler,
       onChangeHandler,
       addItem,
       error,
   }=useAddItemForm(props.addItem);
    return <div>
        <TextField value={newTaskTitle}
                   variant={"standard"}
                   label="Type title"
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
        />
        <Button onClick={addItem} variant={'text'}>+</Button>
    </div>
})
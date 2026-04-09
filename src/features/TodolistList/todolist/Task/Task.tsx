import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpanType";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    task: TaskType;
    todolistId: string;
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.New, props.todolistId);
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox onChange={onChangeStatusHandler}
                  checked={props.task.status===TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})
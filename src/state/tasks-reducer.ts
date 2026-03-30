import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../app/AppWithRedux/app-reducer";

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': return {...state, [action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK': return {...state, [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK': return {...state, [action.todolistId]:state[action.todolistId]
                .map(t=>t.id===action.taskId?{...t, ...action.model}:t)}
        case 'ADD-TODOLIST': return {...state,[action.todolist.id]:[]}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy;
        }
        case 'SET_TASKS':
            return {...state,[action.todolistId]:action.tasks}
        default:
            return state;
    }
}


//actionCreators
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    todolistId,
    taskId
} as const);
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
export const updateTaskAC = (taskId: string,
                             model: UpdateDomainTaskModelType,
                             todolistId: string,) => ({type: 'UPDATE-TASK', model, taskId, todolistId} as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET_TASKS',
    tasks,
    todolistId
} as const);


//thunkCreators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC('loading'));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId));
            dispatch(setStatusAC('succeeded'));
        });
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId));
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType|SetStatusActionType|SetErrorActionType>) => {
    dispatch(setStatusAC('loading'));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setStatusAC('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('something went wrong'));
                }
            }
            dispatch(setStatusAC('failed'));
        })
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
        console.warn("task not found");
        return;
    }
    const apiModel: UpdateTaskType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel,
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
        .then(() => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
        })
}


//types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


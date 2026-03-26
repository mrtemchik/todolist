import {TaskStateType} from "../App/App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistId1,
    todolistId2
} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType,
}
export type UpdateTAskActionType = {
    type: 'UPDATE-TASK',
    taskId: string,
    todolistId: string,
    model:UpdateDomainTaskModelType,
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId: string,
    title: string,
}
export type SetTasksActionType = {
    type: 'SET_TASKS',
    tasks:Array<TaskType>,
    todolistId: string,
}


export type ActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTAskActionType| ChangeTaskTitleActionType| AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

const initialState: TaskStateType = {
    [todolistId1]: [
        {
            description: ' ',
            title: "CSS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId1,
            order: 0,
            addedDate: "string",
        },
        {
            description: '',
            title: "JS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId1,
            order: 0,
            addedDate: "string",
        },
        {
            description: '',
            title: "HTML",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId1,
            order: 0,
            addedDate: "string",
        },
        {
            description: '',
            title: "React",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId1,
            order: 0,
            addedDate: "string",
        }
    ],
    [todolistId2]: [
        {
            description: '',
            title: "Book",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId2,
            order: 0,
            addedDate: "string",
        },
        {
            description: '',
            title: "Milk",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            id: v1(),
            todoListId: todolistId2,
            order: 0,
            addedDate: "string",
        }
    ]
};

export const tasksReducer = (state: TaskStateType=initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const newTask = action.task;
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
           let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks.map(
               t=>t.id ===action.taskId ?{...t,...action.model} : t    )
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(
                t=>t.id ===action.taskId
                    ?{...t,title:action.title}
                    : t           )
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolist.id]=[];
            return stateCopy;
        }
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
        case 'SET_TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId]=action.tasks;
            return stateCopy;
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId};
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task};
}
export const updateTaskAC = (taskId: string,
                             model: UpdateDomainTaskModelType,
                             todolistId: string,): UpdateTAskActionType => {
    return {type: 'UPDATE-TASK',model, taskId, todolistId};
}
// export const changeTaskTitleAC = (taskId: string,
//                                    title: string,
//                                    todolistId: string,): ChangeTaskTitleActionType => {
//     return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId};
// }
export const setTasksAC =(tasks:Array<TaskType>, todolistId: string):SetTasksActionType=>{
    return {type:'SET_TASKS', tasks, todolistId};
}

export const fetchTasksTC=(todolistId:string)=>{
    return(dispatch:Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res)=>{
                dispatch(setTasksAC(res.data.items,todolistId));
            });
    }
}

export const removeTaskTC=(taskId:string, todolistId:string)=> {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(() =>{
                dispatch(removeTaskAC(taskId, todolistId));
            })
    }
}

export const addTaskTC= (title: string, todolistId:string)=>{
    return (dispatch:Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res =>{
                dispatch(addTaskAC(res.data.data.item));
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC= (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId:string)=>{
    return (dispatch:Dispatch, getState:()=>AppRootState) => {
        const state=getState();
        const task =state.tasks[todolistId].find(t=>t.id === taskId);
        if(!task){
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
            .then(() =>{
                dispatch(updateTaskAC(taskId, domainModel, todolistId));
            })
    }
}
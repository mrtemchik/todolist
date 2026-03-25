import {TaskStateType} from "../App/App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC, SetTodolistsActionType,
    todolistId1,
    todolistId2
} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string,
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    todolistId: string,
    status: TaskStatuses,
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId: string,
    title: string,
}


export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType| ChangeTaskTitleActionType| AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType

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
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, priority: TaskPriorities.Low, description:'',startDate: '', order:0, deadline:'',addedDate:'', todoListId:action.todolistId};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
           let todolistTasks = state[action.todolistId];
           state[action.todolistId] = todolistTasks.map(
               t=>t.id ===action.taskId
               ?{...t,status:action.status}
                   : t           )
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
            stateCopy[action.todolistId]=[];
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

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId};
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId};
}
export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistId: string,): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId};
}
export const changeTaskTitleAC = (taskId: string,
                                   title: string,
                                   todolistId: string,): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId};
}


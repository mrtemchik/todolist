import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../api/todolists-api";
import {TaskStateType} from "../../AppWithReducers";

export function useTasks() {
    let [tasksObj, setTasks] = useState<TaskStateType>({
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
    });

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "string",
            deadline: "string",
            todoListId: todolistId,
            order: 0,
            addedDate: "string",};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.status = status;
            setTasks({...tasksObj});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj});
        }
    }

    function completelyRemoveTasksForTodolist(id: string) {
        delete tasksObj[id];
        setTasks({...tasksObj});
    }

    function addStateForNewTodolist(newTodolistId: string) {
        setTasks({...tasksObj, [newTodolistId]: []});
    }

    return {
        tasksObj,
        setTasks,
        removeTask,
        addTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    }
}
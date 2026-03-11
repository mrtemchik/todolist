import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export function useTodolists(onTodolistRemoved: (id: string) => void,
                             onTodolistAdded: (id: string) => void) {
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let removeTodolist = (todolistId: string) => {
        let filteredTodoList = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodoList);
        onTodolistRemoved(todolistId)
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let todolist: TodolistType = {
            id: newTodolistId,
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists]);
        onTodolistAdded(newTodolistId);
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    return {todolists, setTodolists, changeFilter, removeTodolist, addTodolist, changeTodolistTitle};
}
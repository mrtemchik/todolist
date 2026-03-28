import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType} from "../../../state/todolist-reducer";

export function useTodolists(onTodolistRemoved: (id: string) => void,
                             onTodolistAdded: (id: string) => void) {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entitystatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1, entitystatus: "idle"},
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
        let todolist: TodolistDomainType = {
            id: newTodolistId,
            filter: 'all',
            title: title,
            addedDate: '',
            order: 0,
            entitystatus:"idle"
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
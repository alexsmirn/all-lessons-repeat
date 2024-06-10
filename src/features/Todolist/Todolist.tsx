import {TodolistFilterType} from "../../app/App";
import {AddItemForm} from "../../components/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.style";



export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    date?: string
    filter: TodolistFilterType
    todolistId: string

    //CallBacks
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void,
    changeTaskStatus: (todolistId: string, taskId: string) => void,
    changeFilter: (todolistId: string, newFilterValue: TodolistFilterType) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const changeTasksFilterHandler = (todolistId: string, newFilterValue: TodolistFilterType) => {
        props.changeFilter(todolistId, newFilterValue)
    }
    const changeTaskStatusHandler = (todolistId: string, taskId: string) => {
        props.changeTaskStatus(todolistId, taskId)
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const changeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.todolistId, newValue)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan value={props.title} setNewValue={changeTodolistTitleHandler}/>

                <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" onClick={() => removeTodolistHandler(props.todolistId)}/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallBack={addTaskHandler}/>
            {props.tasks.length === 0 ? <p>Тасок нет</p> :
                <List>
                    {props.tasks.map(task => {
                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolistId, task.id, title)
                        }

                        return (
                            <ListItem key={task.id} sx={{padding: '0px', display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={() => {
                                        changeTaskStatusHandler(props.todolistId, task.id)
                                    }}/>
                                    <EditableSpan value={task.title} setNewValue={changeTaskTitleHandler}/>
                                </div>
                                <IconButton aria-label="delete" size="small" sx={{padding: '0px'}}>
                                    <DeleteIcon fontSize="medium" onClick={() => removeTaskHandler(props.todolistId, task.id)} />
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={() => changeTasksFilterHandler(props.todolistId, 'all')}
                >All</Button>

                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={() => changeTasksFilterHandler(props.todolistId, 'completed')}
                >Completed</Button>

                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={() => changeTasksFilterHandler(props.todolistId, 'active')}
                >Active</Button>
            </Box>
        </div>
    )
}
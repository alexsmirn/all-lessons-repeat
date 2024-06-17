import {AddItemForm} from "../../components/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan";
import * as React from 'react';
import {useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List'
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.style";
import {TodolistFilterType} from "../../app/AppWithRedux";
import {Task} from "./Task";


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
export const Todolist = React.memo((props: TodolistPropsType) => {
    const changeTasksFilterHandler = (todolistId: string, newFilterValue: TodolistFilterType) => {
        props.changeFilter(todolistId, newFilterValue)
    }

    const removeTodolistHandler = (todolistId: string) => {
        props.removeTodolist(todolistId)
    }

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitleHandler = useCallback((newValue: string) => {
        props.changeTodolistTitle(props.todolistId, newValue)
    }, [props.changeTodolistTitle, props.todolistId])

    let tasksForTodolist = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => !el.isDone)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan value={props.title} setNewValue={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" size="small" onClick={() => removeTodolistHandler(props.todolistId)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallBack={addTaskHandler}/>
            {!props.tasks || props.tasks.length === 0 ? <p>Тасок нет</p> :
                <List>
                    {tasksForTodolist.map(task => {
                        return (
                            <Task key={task.id}
                                  taskId={task.id}
                                  title={task.title}
                                  isDone={task.isDone}
                                  todolistId={props.todolistId}
                                //CallBacks
                                  changeTaskTitle={props.changeTaskTitle}
                                  changeTaskStatus={props.changeTaskStatus}
                                  removeTask={props.removeTask}
                            />
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
})
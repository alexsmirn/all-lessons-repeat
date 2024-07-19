import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import {TaskStatuses} from "../../api/todolist-api";

type TaskPropsType = {
    taskId: string
    title: string
    status: TaskStatuses
    todolistId: string
    //CallBacks
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = (props: TaskPropsType) => {
    const changeTaskStatusHandler = (todolistId: string, taskId: string) => {
        props.changeTaskStatus(todolistId, taskId)
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        props.removeTask(todolistId, taskId)
    }

    const changeTaskTitleHandler = (title: string) => {
        props.changeTaskTitle(props.todolistId, props.taskId, title)
    }

    return (
        <ListItem key={props.taskId} sx={{padding: '0px', display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Checkbox checked={props.status === TaskStatuses.Completed} onChange={() => {
                    changeTaskStatusHandler(props.todolistId, props.taskId)
                }}/>
                <EditableSpan value={props.title} setNewValue={changeTaskTitleHandler}/>
            </div>
            <IconButton aria-label="delete" size="small" sx={{padding: '0px'}}
                        onClick={() => removeTaskHandler(props.todolistId, props.taskId)}>
                <DeleteIcon fontSize="medium"/>
            </IconButton>
        </ListItem>
    )
}
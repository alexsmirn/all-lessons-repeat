import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {useAppDispatch} from "../../state/store";
import {changeTaskStatusTC, deleteTaskTC} from "../../model/tasks-reducer";

type TaskPropsType = {
    taskId: string
    title: string
    status: TaskStatuses
    todolistId: string
    //CallBacks
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

export const Task = (props: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (todolistId: string, taskId: string) => {

        const newStatus = props.status === TaskStatuses.InProgress ? TaskStatuses.Completed : TaskStatuses.InProgress

        dispatch(changeTaskStatusTC(todolistId, taskId, newStatus))
    }

    const removeTaskHandler = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(props.todolistId, props.taskId))
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
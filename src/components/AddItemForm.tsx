import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    //Callbacks
    addItemCallBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    //Handlers
    const onChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputValue === '') {
            setError(false)
            setInputValue(event.currentTarget.value)
        } else setInputValue(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addItemHandler(inputValue)
    }

    const addItemHandler = (title: string) => {
        if (title.trim() !== '') {
            props.addItemCallBack(title.trim())
            setInputValue('')
        } else {
            setError(true)
            setInputValue('')
        }
    }

    return <div>
        <TextField error={error}
                   id={!error ? "outlined-basic" : "outlined-error"}
                   label={!error ? "Enter title" : "Title is required"}
                   variant="outlined"
                   value={inputValue}
                   onChange={onChangeInputValue}
                   onKeyUp={addItemOnKeyUpHandler}
                   size={'small'}
        />
        <Button variant="contained" onClick={() => addItemHandler(inputValue)} size={'medium'}>+</Button>
    </div>
}
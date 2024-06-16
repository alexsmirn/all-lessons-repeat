import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";


type AddItemFormPropsType = {
    //Callbacks
    addItemCallBack: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm called')

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

    return <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <TextField error={error}
                   id={!error ? "outlined-basic" : "outlined-error"}
                   label={!error ? "Enter title" : "Title is required"}
                   variant="outlined"
                   value={inputValue}
                   onChange={onChangeInputValue}
                   onKeyUp={addItemOnKeyUpHandler}
                   size={'small'}
        />
        <IconButton size={'large'} onClick={() => addItemHandler(inputValue)} color={'primary'} sx={{padding: '0px', height: '24px'}}>
            <AddBoxIcon fontSize={'large'}/>
        </IconButton>
    </Box>
})
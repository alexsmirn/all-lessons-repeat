import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

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
        <input value={inputValue}
               onChange={onChangeInputValue}
               onKeyUp={addItemOnKeyUpHandler}
               className={error ? 'error-input' : ''}
        />
        <Button title={'+'} callBack={() => addItemHandler(inputValue)}/>
        {error && <p className={'error-message'}>Title is required</p>}
    </div>
}
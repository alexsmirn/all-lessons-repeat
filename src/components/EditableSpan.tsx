import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string,
    setNewValue: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.setNewValue(inputValue)
    }

    const changeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        setInputValue(event.currentTarget.value)
    }

    return <>
        {editMode ? (
            <input
                autoFocus
                value={inputValue}
                onBlur={deactivateEditMode}
                onChange={changeInputValueHandler}
            />
        ) : (
            <span onDoubleClick={activateEditMode}>{props.value}</span>
        )}
    </>
}
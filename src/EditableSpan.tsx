import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
	oldTitle: string
	callBack: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
	const [edit, setEdit] = useState(false)
	let [newTitle, setNewTitle] = useState(props.oldTitle)
	const editHandler = () => {
		setEdit(!edit)
		addTask()
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}
	const addTask = () => {
		props.callBack(newTitle)
	}
	return edit ? (
		<TextField
			value={newTitle}
			onChange={onChangeHandler}
			onBlur={editHandler}
			autoFocus
		/>
	) : (
		<span onDoubleClick={editHandler}>{props.oldTitle}</span>
	)
}

export default EditableSpan

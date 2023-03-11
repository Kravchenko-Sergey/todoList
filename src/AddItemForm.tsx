import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'

type AddItemFormPropsType = {
	callBack: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)
	const addTask = () => {
		let newTitle = title.trim()
		if (newTitle !== '') {
			props.callBack(newTitle)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addTask()
		}
	}
	return (
		<div>
			<TextField
				variant={'outlined'}
				label={'Type value'}
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
			/>
			<IconButton onClick={addTask} color={'primary'}>
				<ControlPoint />
			</IconButton>
		</div>
	)
}

export default AddItemForm

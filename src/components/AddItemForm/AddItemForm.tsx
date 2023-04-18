import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'
import { v1 } from 'uuid'

type AddItemFormPropsType = {
	callBack: (title: string, newId: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	const newId = v1()
	const addTask = () => {
		let newTitle = title.trim()
		if (newTitle !== '') {
			props.callBack(newTitle, newId)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		error !== null && setError(null)
		e.charCode === 13 && addTask()
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
				size='small'
			/>
			<IconButton onClick={addTask} color={'primary'}>
				<ControlPoint />
			</IconButton>
		</div>
	)
})

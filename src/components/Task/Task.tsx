import React, { ChangeEvent } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@mui/icons-material'
import { TaskType } from '../Todolist/Todolist'
import { changeStatusAC, removeTaskAC, updateTaskAC } from '../../state/reducers/tasksReducer'
import { useDispatch } from 'react-redux'

export type TaskPropsType = {
	task: TaskType
	todoListId: string
}

export const Task = (props: TaskPropsType) => {
	const dispatch = useDispatch()
	const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todoListId))
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		dispatch(changeStatusAC(props.task.id, newIsDoneValue, props.todoListId))
	}
	const updateTaskHandler = (taskId: string, newTitle: string) => {
		dispatch(updateTaskAC(props.todoListId, taskId, newTitle))
	}

	return (
		<div className={props.task.isDone ? 'is-done' : ''}>
			<Checkbox onChange={onChangeHandler} checked={props.task.isDone} size='small' />
			<EditableSpan oldTitle={props.task.title} callBack={newTitle => updateTaskHandler(props.task.id, newTitle)} />
			<IconButton size='small' onClick={onClickHandler}>
				<Delete fontSize='small' />
			</IconButton>
		</div>
	)
}

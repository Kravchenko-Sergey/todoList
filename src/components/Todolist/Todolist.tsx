import React, { memo, useCallback } from 'react'
import { FilterValuesType } from '../../App'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../state/store'
import { addTaskAC } from '../../state/reducers/tasksReducer'
import { changeFilterAC, removeTodoListAC, updateTodoListTitleAC } from '../../state/reducers/todoListsReducer'
import { Task } from '../Task/Task'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todoListId: string
	title: string
	filter: FilterValuesType
}

export const Todolist = memo((props: PropsType) => {
	console.log('TodoList')
	let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])

	const dispatch = useDispatch()

	const removeTodolist = () => dispatch(removeTodoListAC(props.todoListId))

	const onAllClickHandler = useCallback(
		() => dispatch(changeFilterAC('all', props.todoListId)),
		[dispatch, props.todoListId]
	)

	const onActiveClickHandler = useCallback(
		() => dispatch(changeFilterAC('active', props.todoListId)),
		[dispatch, props.todoListId]
	)

	const onCompletedClickHandler = useCallback(
		() => dispatch(changeFilterAC('completed', props.todoListId)),
		[dispatch, props.todoListId]
	)

	if (props.filter === 'active') {
		tasks = tasks.filter(t => !t.isDone)
	}
	if (props.filter === 'completed') {
		tasks = tasks.filter(t => t.isDone)
	}

	const addTaskHandler = (title: string) => {
		dispatch(addTaskAC(title, props.todoListId))
	}

	const updateTodolistHandler = (newTitle: string) => {
		dispatch(updateTodoListTitleAC(props.todoListId, newTitle))
	}

	return (
		<div>
			<h3>
				<EditableSpan oldTitle={props.title} callBack={updateTodolistHandler} />
				<IconButton size='small' onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm callBack={addTaskHandler} />
			<div>
				{tasks.map(task => (
					<Task key={task.id} task={task} todoListId={props.todoListId} />
				))}
			</div>
			<div>
				<Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
					All
				</Button>
				<Button variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>
					Active
				</Button>
				<Button variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>
					Completed
				</Button>
			</div>
		</div>
	)
})

import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	filter: FilterValuesType
	updateTask: (todolistId: string, taskId: string, newTitle: string) => void
	updateTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
	const removeTodolist = () => props.removeTodolist(props.id)
	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)

	const addTaskHandler = (title: string) => {
		props.addTask(title, props.id)
	}

	const updateTaskHandler = (taskId: string, newTitle: string) => {
		props.updateTask(props.id, taskId, newTitle)
	}

	const updateTodolistHandler = (newTitle: string) => {
		props.updateTodolistTitle(props.id, newTitle)
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
				{props.tasks.map(t => {
					const onClickHandler = () => props.removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDoneValue = e.currentTarget.checked
						props.changeTaskStatus(t.id, newIsDoneValue, props.id)
					}
					/*const updateTaskHandler = (newTitle: string) => {
						props.updateTask(props.id, t.id, newTitle)
					}*/
					return (
						<div key={t.id} className={t.isDone ? 'is-done' : ''}>
							<Checkbox onChange={onChangeHandler} checked={t.isDone} />
							<EditableSpan
								oldTitle={t.title}
								callBack={newTitle => updateTaskHandler(t.id, newTitle)}
							/>
							<IconButton size='small' onClick={onClickHandler}>
								<Delete />
							</IconButton>
						</div>
					)
				})}
			</div>
			<div>
				<Button
					variant={props.filter === 'all' ? 'contained' : 'text'}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'contained' : 'text'}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
}

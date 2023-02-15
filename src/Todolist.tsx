import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from './App'
import './App.css'
import { Task } from './Task'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
	setTasks: (tasks: Array<TaskType>) => void
	removeTask: (taskId: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (value: string) => void
	changeStatus: (taskId: string, isDone: boolean) => void
	error: string | null
	setError: (error: string | null) => void
	filter: FilterValuesType
}

export function Todolist(props: PropsType) {
	const [value, setValue] = useState('')

	const buttonHandler = () => {
		props.addTask(value)
		setValue('')
	}
	const tasksElement = props.tasks.map(t => {
		const removeTaskHandler = () => {
			props.removeTask(t.id)
		}
		const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
			props.changeStatus(t.id, event.currentTarget.checked)
		}
		return (
			<Task
				key={t.id}
				id={t.id}
				title={t.title}
				isDone={t.isDone}
				removeTaskHandler={removeTaskHandler}
				changeStatus={props.changeStatus}
				onChangeHandler={onChangeHandler}
			/>
		)
	})
	const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
	}
	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		props.setError(null)
		if (event.key === 'Enter') buttonHandler()
	}

	const tsarChangeFilterHandler = (title: FilterValuesType) =>
		props.changeFilter(title)

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input
					value={value}
					onChange={onChangeInputHandler}
					onKeyDown={onKeyPressHandler}
					className={props.error ? 'error' : ''}
				/>
				<button onClick={buttonHandler}>+</button>
				{props.error && <div className='error-message'>{props.error}</div>}
			</div>
			<ul>{tasksElement}</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={() => tsarChangeFilterHandler('all')}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={() => tsarChangeFilterHandler('active')}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={() => tsarChangeFilterHandler('completed')}
				>
					Completed
				</button>
			</div>
		</div>
	)
}

import React, { ChangeEvent } from 'react'
import './App.css'

type TaskPropsType = {
	id: string
	title: string
	isDone: boolean
	removeTaskHandler: () => void
	changeStatus: (taskId: string, isDone: boolean) => void
	onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Task(props: TaskPropsType) {
	return (
		<li className={props.isDone ? 'is-done' : ''} key={props.id}>
			<input
				type='checkbox'
				checked={props.isDone}
				onChange={props.onChangeHandler}
			/>
			<span>{props.title}</span>
			<button onClick={props.removeTaskHandler}>x</button>
		</li>
	)
}

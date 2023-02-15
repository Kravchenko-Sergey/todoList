import React, { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	let [tasks, setTasks] = useState([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Rest API', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false }
	])
	const [error, setError] = useState<string | null>(null)
	const addTask = (value: string) => {
		const newTask = {
			id: v1(),
			title: value,
			isDone: false
		}
		value.trim() !== ''
			? setTasks([newTask, ...tasks])
			: setError('Title is required')
	}

	function changeStatus(taskId: string, isDone: boolean) {
		const task = tasks.find(task => task.id === taskId)
		if (task) {
			task.isDone = isDone
		}
		setTasks([...tasks])
	}

	function removeTask(id: string) {
		let filteredTasks = tasks.filter(t => t.id != id)
		setTasks(filteredTasks)
	}

	let [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForTodolist = tasks

	if (filter === 'active') {
		tasksForTodolist = tasks.filter(t => !t.isDone)
	}
	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(t => t.isDone)
	}

	function changeFilter(value: FilterValuesType) {
		setFilter(value)
	}

	return (
		<div className='App'>
			<Todolist
				title='What to learn'
				tasks={tasksForTodolist}
				setTasks={setTasks}
				addTask={addTask}
				removeTask={removeTask}
				changeFilter={changeFilter}
				changeStatus={changeStatus}
				filter={filter}
				error={error}
				setError={setError}
			/>
		</div>
	)
}

export default App

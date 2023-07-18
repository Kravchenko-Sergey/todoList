import React, { FC, useEffect } from 'react'
import { AddItemForm } from 'components/addItem-form/addItem-form'
import { TodolistDomainType } from 'features/todolists-list/todolists/model/todolists-reducer'
import { tasksThunks } from 'features/todolists-list/tasks/model'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { TaskStatuses, TaskType } from 'features/todolists-list/tasks/api'
import { TodolistTitle } from 'features/todolists-list/todolists/ui/todolist/todolist-title/todolist-title'
import { Tasks } from 'features/todolists-list/todolists/ui/todolist/tasks/tasks'
import { FilterTasksButtons } from 'features/todolists-list/todolists/ui/todolist/filter-tasks-buttons/filter-tasks-buttons'

type Props = {
	todolist: TodolistDomainType
	tasks: Array<TaskType>
}

export const Todolist: FC<Props> = ({ todolist, tasks }) => {
	const dispatch = useAppDispatch()

	const addTask = (title: string) => {
		dispatch(tasksThunks.addTask({ todolistId: todolist.id, title }))
	}

	if (todolist.filter === 'active') {
		tasks = tasks.filter(t => t.status === TaskStatuses.New)
	}
	if (todolist.filter === 'completed') {
		tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	useEffect(() => {
		dispatch(tasksThunks.fetchTasks({ todolistId: todolist.id }))
	}, [dispatch, todolist.id])

	return (
		<div>
			<TodolistTitle todolistId={todolist.id} title={todolist.title} entityStatus={todolist.entityStatus} />
			<AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'} />
			<Tasks todolistId={todolist.id} tasks={tasks} />
			<FilterTasksButtons id={todolist.id} filter={todolist.filter} />
		</div>
	)
}

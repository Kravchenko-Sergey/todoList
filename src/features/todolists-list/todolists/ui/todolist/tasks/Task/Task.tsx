import React, { ChangeEvent, FC } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from 'components/editable-span/editable-span'
import { Delete } from '@mui/icons-material'
import { TaskStatuses, TaskType } from 'features/todolists-list/tasks/api/tasks-api-types'
import { tasksThunks } from 'features/todolists-list/tasks/model'
import { useAppDispatch } from 'hooks/useAppDispatch'

type Props = { task: TaskType; todolistId: string }
export const Task: FC<Props> = ({ task, todolistId }) => {
	const dispatch = useAppDispatch()
	const handleRemoveTask = () => removeTask(task.id, todolistId)

	const removeTask = (taskId: string, todolistId: string) => {
		dispatch(tasksThunks.removeTask({ taskId, todolistId }))
	}

	const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		changeStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
	}

	const changeStatus = function (taskId: string, status: TaskStatuses, todolistId: string) {
		dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }))
	}

	const handleChangeTitle = (newValue: string) => {
		changeTaskTitle(task.id, newValue, todolistId)
	}

	const changeTaskTitle = function (taskId: string, title: string, todolistId: string) {
		dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }))
	}

	return (
		<div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
			<Checkbox checked={task.status === TaskStatuses.Completed} color='primary' onChange={handleChangeStatus} />
			<EditableSpan value={task.title} onChange={handleChangeTitle} />
			<IconButton onClick={handleRemoveTask}>
				<Delete />
			</IconButton>
		</div>
	)
}

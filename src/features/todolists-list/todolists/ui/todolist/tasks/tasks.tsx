import React, { FC } from 'react'
import { TaskType } from 'features/todolists-list/tasks/api'
import { Task } from 'features/todolists-list/todolists/ui/todolist/tasks/Task/Task'

type Props = {
	todolistId: string
	tasks: TaskType[]
}

export const Tasks: FC<Props> = ({ todolistId, tasks }) => {
	return (
		<div>
			{tasks.map(t => (
				<Task key={t.id} task={t} todolistId={todolistId} />
			))}
		</div>
	)
}

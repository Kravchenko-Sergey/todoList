/*import React from 'react'
import { Task } from './Task'
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator'

export default {
	title: 'Task Component',
	component: Task,
	decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = (props: any) => {
	return (
		<>
			<Task task={{ id: '1', title: 'CSS', isDone: true }} todoListId={'todolistId1'} />
			<Task task={{ id: '2', title: 'JS', isDone: false }} todoListId={'todolistId2'} />
		</>
	)
}*/

import { Meta, StoryObj } from '@storybook/react'
import { Task } from './Task'
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator'

const meta: Meta<typeof Task> = {
	title: 'TODOLIST/Task',
	component: Task,
	decorators: [ReduxStoreProviderDecorator]
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDone: Story = {
	args: {
		task: { id: 'taskId1', title: 'React', isDone: false },
		todoListId: 'todolistId1'
	}
}

export const TaskIsDone: Story = {
	args: {
		task: { id: 'taskId1', title: 'React', isDone: true },
		todoListId: 'todolistId1'
	}
}

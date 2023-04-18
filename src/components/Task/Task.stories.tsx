import React from 'react'
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
}

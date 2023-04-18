import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '../state/store'
import { tasksReducer } from '../state/reducers/tasksReducer'
import { todoListsReducer } from '../state/reducers/todoListsReducer'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todoListsReducer
})

const initialGlobalState = {
	todolists: [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all' },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all' }
	],
	tasks: {
		['todolistId1']: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true }
		],
		['todolistId2']: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true }
		]
	}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as any)

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>

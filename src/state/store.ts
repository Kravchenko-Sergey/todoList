import { combineReducers, createStore } from 'redux'
import { todoListsReducer } from './reducers/todoListsReducer'
import { tasksReducer } from './reducers/tasksReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
	todoLists: todoListsReducer,
	tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

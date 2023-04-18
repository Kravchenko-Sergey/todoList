import {
	addTodoListAC,
	changeFilterAC,
	removeTodoListAC,
	todoListsReducer,
	updateTodoListTitleAC
} from './todoListsReducer'
import { v1 } from 'uuid'
import { FilterValuesType, TodoListType } from '../../App'

let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' }
	]
})

test('correct todolist should be removed', () => {
	const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
	const newTodolistTitle = 'New Todolist'
	const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(newTodolistTitle)
	expect(endState[0].filter).toBe('all')
	expect(endState[0].id).toBeDefined()
})
test('correct todolist should change its name', () => {
	const newTodolistTitle = 'New Todolist'
	const action = {
		type: 'UPDATE-TODOLIST-TITLE',
		id: todolistId2,
		title: newTodolistTitle
	}
	const endState = todoListsReducer(startState, updateTodoListTitleAC(action.id, action.title))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
	const newFilter: FilterValuesType = 'completed'
	const action = {
		type: 'CHANGE-TODOLIST-FILTER',
		id: todolistId2,
		filter: newFilter
	}
	const endState = todoListsReducer(startState, changeFilterAC(action.filter, action.id))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

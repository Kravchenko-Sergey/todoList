import { addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from './tasksReducer'
import { TasksStateType } from '../../App'
import { addTodoListAC, removeTodoListAC } from './todoListsReducer'

let startState: TasksStateType

beforeEach(() => {
	startState = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false }
		],

		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false }
		]
	}
})

test('new property with new array should be added when new todolist is added', () => {
	const action = addTodoListAC('title no matter')
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
	const action = removeTodoListAC('todolistId2')
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].title).toBe('JS')
	expect(endState['todolistId2'][2].title).toBe('MilkyWay')

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeUndefined()
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAC('2', 'todoListId2')
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe([3])
	expect(endState['todolistId2'].length).toBe([2])
	expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
	const action = addTaskAC('juice', 'todoListId2')
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juice')
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const action = changeStatusAC('2', false, 'todolistId2')
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].isDone).toBeTruthy()
	expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test('title of specified task should be changed', () => {
	const action = updateTaskAC('todolistId2', '2', 'MilkyWay')
	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].title).toBe('JS')
	expect(endState['todolistId2'][1].title).toBe('MilkyWay')
})

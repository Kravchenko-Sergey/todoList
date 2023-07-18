import React, { FC } from 'react'
import { Button } from '@mui/material'
import { FilterValuesType, todolistsActions } from 'features/todolists-list/todolists/model/todolists-reducer'
import { useAppDispatch } from 'hooks/useAppDispatch'

type Props = {
	id: string
	filter: string
}

export const FilterTasksButtons: FC<Props> = ({ id, filter }) => {
	const dispatch = useAppDispatch()

	const handleChangeFilter = (id: string, filter: FilterValuesType) => {
		return changeFilter(id, filter)
	}

	const changeFilter = (id: string, filter: FilterValuesType) => {
		dispatch(todolistsActions.changeTodolistFilter({ id, filter }))
	}

	return (
		<div style={{ paddingTop: '10px' }}>
			<Button
				variant={filter === 'all' ? 'outlined' : 'text'}
				onClick={() => handleChangeFilter(id, 'all')}
				color={'inherit'}
			>
				All
			</Button>
			<Button
				variant={filter === 'active' ? 'outlined' : 'text'}
				onClick={() => handleChangeFilter(id, 'active')}
				color={'primary'}
			>
				Active
			</Button>
			<Button
				variant={filter === 'completed' ? 'outlined' : 'text'}
				onClick={() => handleChangeFilter(id, 'completed')}
				color={'secondary'}
			>
				Completed
			</Button>
		</div>
	)
}

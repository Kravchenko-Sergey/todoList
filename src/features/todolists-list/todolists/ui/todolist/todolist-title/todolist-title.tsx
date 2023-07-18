import React, { FC } from 'react'
import { EditableSpan } from 'components/editable-span/editable-span'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { todolistsThunks } from 'features/todolists-list/todolists/model/todolists-reducer'
import { useAppDispatch } from 'hooks/useAppDispatch'

type Props = {
	todolistId: string
	title: string
	entityStatus: any
}

export const TodolistTitle: FC<Props> = ({ todolistId, title, entityStatus }) => {
	const dispatch = useAppDispatch()
	const handleChangeTodolistTitle = (title: string) => {
		changeTodolistTitle(todolistId, title)
	}

	const changeTodolistTitle = (id: string, title: string) => {
		dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
	}

	const handleRemoveTodolist = () => {
		removeTodolist(todolistId)
	}

	const removeTodolist = (id: string) => {
		dispatch(todolistsThunks.removeTodolist({ id }))
	}

	return (
		<h3>
			<EditableSpan value={title} onChange={handleChangeTodolistTitle} />
			<IconButton onClick={handleRemoveTodolist} disabled={entityStatus === 'loading'}>
				<Delete />
			</IconButton>
		</h3>
	)
}

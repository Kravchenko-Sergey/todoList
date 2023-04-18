import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
	title: 'EditableSpan component',
	component: EditableSpan
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = (props: any) => {
	return <EditableSpan oldTitle={'Start value'} callBack={changeCallback} />
}

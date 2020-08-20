import * as React from 'react'
import { action } from '@storybook/addon-actions'

import { InputComponent, InputComponentPropsInterface } from './InputComponent'

export default {
  title: 'Input',
  component: InputComponent,
}

const Template = (arg: InputComponentPropsInterface): JSX.Element => (
  <InputComponent {...arg} />
)

export const Default = Template.bind({})

Default.args = {
  id: 'input',
  value: '',
  onChangeValue: action('OnChangeValue'),
  type: 'text',
}

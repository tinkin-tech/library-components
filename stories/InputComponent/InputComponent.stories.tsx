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

export const Primary = Template.bind({})

Primary.args = {
  id: 'input',
  value: '',
  onChangeValue: action('OnChangeValue'),
  type: 'text',
  placeholder: '',
  label: '',
  labelPosition: '',
  required: true,
  error: '',
  errorPosition: '',
  disable: false,
}

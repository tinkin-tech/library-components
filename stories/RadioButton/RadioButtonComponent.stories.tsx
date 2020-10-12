import * as React from 'react'
import { action } from '@storybook/addon-actions'

import {
  RadioButtonComponent,
  IRadioButtonComponent,
} from './RadioButtonComponent'

export default {
  title: 'Radio Button',
  component: RadioButtonComponent,
}

const Template = (arg: IRadioButtonComponent): JSX.Element => (
  <RadioButtonComponent {...arg} />
)

export const Default: { args: IRadioButtonComponent } = Template.bind({})

Default.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  value: '2',
  onChangeValue: action('onChangeValue'),
  valueId: 'RadioId',
  label: 'Radio Button',
}

export const Error: { args: IRadioButtonComponent } = Template.bind({})

Error.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  value: '2',
  onChangeValue: action('onChangeValue'),
  valueId: 'RadioId',
  label: 'Radio Button',
  error: 'Custom Error',
}

export const Disable: { args: IRadioButtonComponent } = Template.bind({})

Disable.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  value: '2',
  onChangeValue: action('onChangeValue'),
  valueId: 'RadioId',
  label: 'Radio Button',
  disabled: true,
}

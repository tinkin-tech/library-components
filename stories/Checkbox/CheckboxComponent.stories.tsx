import * as React from 'react'

import CheckboxComponent, { ICheckboxComponent } from './CheckboxComponent'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Checkbox',
  component: CheckboxComponent,
}

const Template = (arg: ICheckboxComponent): JSX.Element => (
  <CheckboxComponent {...arg} />
)

export const Default: { args: ICheckboxComponent } = Template.bind({})

Default.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  values: ['2'],
  onChangeValues: action('onChangeValues'),
  valueId: 'CheckId',
  label: 'Checkbox',
}

export const Error: { args: ICheckboxComponent } = Template.bind({})

Error.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  values: ['2'],
  onChangeValues: action('onChangeValues'),
  valueId: 'CheckId',
  label: 'Checkbox',
  error: 'Custom Error',
}

export const Disable: { args: ICheckboxComponent } = Template.bind({})

Disable.args = {
  options: [
    { id: 1, label: 'Option 1' },
    { id: '2', label: 'Option 2' },
  ],
  values: ['2'],
  onChangeValues: action('onChangeValues'),
  valueId: 'CheckId',
  label: 'Checkbox',
  disabled: true,
}

import * as React from 'react'

import CheckboxComponent, { ICheckboxComponent } from './CheckboxComponent'

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
  onChangeValues: (value, _id) => console.log(value),
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
  onChangeValues: (value, _id) => console.log(value),
  valueId: 'CheckId',
  label: 'Checkbox',
  error: 'Custom Error',
}
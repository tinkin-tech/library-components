import * as React from 'react'
import { action } from '@storybook/addon-actions'

import { SelectComponent, ISelectComponent } from './SelectComponent'

export default {
  title: 'Select',
  component: SelectComponent,
}

const Template = (args: ISelectComponent): JSX.Element => (
  <SelectComponent {...args} />
)

export const Default: { args: ISelectComponent } = Template.bind({})

export const Error: { args: ISelectComponent } = Template.bind({})

export const Disable: { args: ISelectComponent } = Template.bind({})

export const BottomDescription: { args: ISelectComponent } = Template.bind({})

const options = [
  {
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Option 2',
  },
  {
    id: '3',
    label: 'Option 3',
  },
]

Default.args = {
  value: '1',
  options,
  valueId: '',
  onChangeValue: action('onChangeValue'),
  error: '',
  label: '',
  readOnly: false,
  required: false,
  placeholder: '',
  labelClassName: '',
  selectClassName: '',
  extraLabelClassName: '',
  extraSelectClassName: '',
}

Error.args = {
  value: '',
  onChangeValue: action('onChangeValue'),
  valueId: '',
  options,
  error: 'select error default text',
  label: 'Select Label',
  readOnly: false,
  required: true,
  placeholder: '',
  labelClassName: '',
  selectClassName: '',
  extraLabelClassName: '',
  extraSelectClassName: '',
}

Disable.args = {
  options,
  onChangeValue: action('onChangeValue'),
  value: '',
  valueId: '',
  error: '',
  label: '',
  readOnly: true,
  required: false,
  placeholder: '',
  labelClassName: '',
  selectClassName: '',
  extraLabelClassName: '',
  extraSelectClassName: '',
}

BottomDescription.args = {
  options,
  onChangeValue: action('onChangeValue'),
  value: '',
  valueId: '',
  error: '',
  label: '',
  readOnly: true,
  required: false,
  placeholder: '',
  labelClassName: '',
  selectClassName: '',
  extraLabelClassName: '',
  extraSelectClassName: '',
  bottomDescription: <div>Descripción del select</div>,
}

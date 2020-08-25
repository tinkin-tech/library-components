import * as React from 'react'
import { SelectComponent, OptionsInterface } from './Select'

export default {
  title: 'Select',
  component: SelectComponent,
}

const options: OptionsInterface[] = [
  {
    id: 'option1',
    value: 'option1',
  },
  {
    id: 'option2',
    value: 'option2',
  },
  {
    id: 'option3',
    value: 'option3',
  },
]

interface PropsInterface {
  options: OptionsInterface[]
  className: string
  placeholder: string
  displayArrow: boolean
  error: string
  disabled: boolean
  search: boolean
  onChange: () => void
  id: string
  required?: boolean
  label?: string
}

const Template = (args: PropsInterface): React.ReactElement => (
  <SelectComponent {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  onChange: (): void => null,
  options: options || [],
  className: 'simple-select',
  placeholder: 'Select an option',
  displayArrow: true,
  error: '',
  disabled: '',
  search: false,
  id: 'select',
  label: 'Select Default',
  required: false,
}

export const Search = Template.bind({})
Search.args = {
  onChange: (): void => null,
  options: options || [],
  className: 'simple-select',
  placeholder: 'Select an option',
  displayArrow: true,
  error: '',
  disabled: '',
  search: true,
}

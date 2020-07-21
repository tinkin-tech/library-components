import * as React from 'react'
import { action } from '@storybook/addon-actions'

import Select, { IOptions } from './Select'

export default {
  title: 'Select',
  component: Select,
}

const options: IOptions[] = [
  {
    id: 'option1',
    value: 'option1'
  },
  {
    id: 'option2',
    value: 'option2'
  },
  {
    id: 'option3',
    value: 'option3'
  }
]

export const Active = (): React.ReactNode =>
  <Select
    onChange={action('selected')}
    options={options}
    className='test-select'
    label='select'
    placeholder='select an option'
    borderStyle={true}
  />

export const Disabled = (): React.ReactNode =>
  <Select
    onChange={action('selected')}
    options={options}
    className='test-select'
    label='select'
    placeholder='select an option'
    borderStyle={true}
    disable={true}
    displayArrow={true}
  />
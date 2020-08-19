import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import Select, { Option } from './Select'

export default {
  title: 'Select',
  component: Select,
  decorators: [withKnobs]
}

const options: Option[] = [
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

export const Simple = (): React.ReactNode =>
  <Select
    onChange={action('selected')}
    options={boolean('Empty', false) ? [] : options}
    className='simple-select'
    placeholder={text('Label', 'Select an option')}
    borderStyle={boolean('Border', true)}
    displayArrow={boolean('Arrow', true)}
    error={text('Error', '')}
    disable={boolean('Disabled', false)}
  />

export const Search = (): React.ReactNode =>
  <Select
    onChange={action('selected')}
    options={boolean('Empty', false) ? [] : options}
    className='simple-select'
    placeholder={text('Label', 'Buscar...')}
    borderStyle={boolean('Border', true)}
    displayArrow={boolean('Arrow', true)}
    error={text('Error', '')}
    disable={boolean('Disabled', false)}
    search={true}
  />

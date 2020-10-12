import * as React from 'react'
import { action } from '@storybook/addon-actions'

import {
  MultilevelFilterComponent,
  IMultilevelFilter,
  IMultilevelOptionChild,
} from './MultilevelFilterComponent'

export default {
  title: 'Multi Level Filter',
  component: MultilevelFilterComponent,
}

const Template = (arg: IMultilevelFilter): JSX.Element => (
  <MultilevelFilterComponent {...arg} />
)

export const Default: { args: IMultilevelFilter } = Template.bind({})

const componentOptions: Array<IMultilevelOptionChild> = [
  {
    id: '1',
    label: 'Filter 1',
    children: [
      {
        id: '1-1',
        label: 'Filter 1 1',
        children: [
          {
            id: '1-1-1',
            label: 'Filter 1 1 1',
          },
          {
            id: '1-1-2',
            label: 'Filter 1 1 2',
          },
        ],
      },
      {
        id: '1-2',
        label: 'Filter 1 2',
      },
    ],
  },
  {
    id: '2',
    label: 'Filter 2',
  },
  {
    id: '3',
    label: 'Filter 3',
    children: [
      {
        id: '3-1-1',
        label: 'Filter 3 1 1',
      },
      {
        id: '3-1-2',
        label: 'Filter 3 1 2',
      },
      {
        id: '3-1-3',
        label: 'Filter 3 1 3',
      },
    ],
    notSelectable: true,
  },
  {
    id: '4',
    label: 'Filter 4',
    children: [],
  },
]

Default.args = {
  options: componentOptions,
  valueId: 'componentValueId',
  values: ['1-1-1', '1-1-2'],
  onChangeValue: action('onChangeValue'),
  label: 'Component Label',
  placeholder: 'Selec a option',
  minOptionsWidth: '250px',
}

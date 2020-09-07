import * as React from 'react'

import TableComponent, {
  ILabelProps,
  ITableProps,
  ITableRows,
} from './TableComponent'

export default {
  title: 'Table',
  component: TableComponent,
}

const Template = (arg: ITableProps): JSX.Element => <TableComponent {...arg} />

export const Default: { args: ITableProps } = Template.bind({})

const labelProps: Array<ILabelProps> = [
  {
    id: 'avatar',
    width: 100,
    typeWidth: 'px',
    label: '',
  },
  {
    id: 'name',
    width: 25,
    typeWidth: '%',
    label: 'User Name',
  },
  {
    id: 'isActive',
    width: 25,
    typeWidth: '%',
    label: 'User is Active',
  },
  {
    id: 'age',
    width: 25,
    typeWidth: '%',
    label: 'User age',
  },
  {
    id: 'tags',
    width: 25,
    typeWidth: '%',
    label: 'Tags',
  },
]

const tableRows: Array<ITableRows> = [
  {
    id: '1',
    columns: [
      {
        id: 'avatar',
        onClick: (_item): void => null,
        type: 'image',
        value: 'https://tinkin.one/images/about.png',
        minHeight: 100,
      },
      {
        id: 'name',
        type: 'string',
        value: 'Pepito',
      },
      {
        id: 'isActive',
        type: 'switch',
        value: true,
      },
      {
        id: 'age',
        type: 'number',
        value: 24,
      },
      {
        id: 'tags',
        type: 'custom',
        cellClassName: 'align-right',
        value: (
          <div
            className="inline-block p-l-s p-r-s small bg-info
          bg-lighten-1 radius-small"
          >
            new user
          </div>
        ),
      },
    ],
  },
  {
    id: '2',
    columns: [
      {
        id: 'avatar',
        onClick: (_item): void => null,
        type: 'image',
        value: 'https://tinkin.one/images/about.png',
        minHeight: 100,
      },
      {
        id: 'name',
        type: 'string',
        value: 'Lola',
      },
      {
        id: 'isActive',
        type: 'switch',
        value: false,
      },
      {
        id: 'tags',
        type: 'custom',
        cellClassName: 'align-right',
        value: (
          <div
            className="inline-block p-l-s p-r-s small bg-success
          bg-lighten-1 radius-small"
          >
            old user
          </div>
        ),
      },
    ],
  },
]

Default.args = {
  labelProps: labelProps || [],
  tableRows: tableRows || [],
  activeRowId: '2',
  extraLabelsClassName: 'border-b-w-2',
}

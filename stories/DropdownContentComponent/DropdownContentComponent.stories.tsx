import * as React from 'react'

import {
  DropdownContentComponent,
  IDropDownContentProps,
} from './DropdownContentComponent'

export default {
  title: 'Dropdown Content',
  component: DropdownContentComponent,
}

const Template = (args: IDropDownContentProps): JSX.Element => (
  <DropdownContentComponent {...args} />
)

export const Default: { args: IDropDownContentProps } = Template.bind({})

Default.args = {
  buttonLabel: 'Demo button',
  dropDownContentLabel: 'Demo Label',
  dropDownContent: [
    {
      id: 1,
      label: 'Option 1',
    },
    {
      id: 2,
      label: 'Option 2',
    },
    {
      id: 3,
      label: 'Option 3',
    },
    {
      id: 4,
      label: 'Option 4',
    },
  ],
  clearLabel: 'clear',
  applyLabel: 'apply',
  clearAction: (): void => null,
  closeOnClear: true,
  optionValues: [1],
  applyAction: (): void => null,
}

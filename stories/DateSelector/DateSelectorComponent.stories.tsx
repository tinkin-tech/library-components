import * as React from 'react'
import DateSelectorComponent, {
  IDateSelectorComponent,
} from './DateSelectorComponent'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Date Selector',
  component: DateSelectorComponent,
}

const Template = (args: IDateSelectorComponent): JSX.Element => (
  <DateSelectorComponent {...args} />
)

export const Default: { args: IDateSelectorComponent } = Template.bind({})

Default.args = {
  date: '2020-02-01',
  valueId: 'dateSelector',
  dateFormat: 'YYYY-MM-DD',
  onChangeDate: action('onChangeDate'),
  error: '',
  label: 'Date Selector',
  maxDate: '2026-02-01',
  minDate: '2015-02-01',
  required: false,
  inputClassName: '',
  labelClassName: '',
}

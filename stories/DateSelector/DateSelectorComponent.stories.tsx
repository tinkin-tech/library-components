import * as React from 'react'
import { action } from '@storybook/addon-actions'

import {
  DateSelectorComponent,
  IDateSelectorComponent,
} from './DateSelectorComponent'

export default {
  title: 'Date Selector',
  component: DateSelectorComponent,
}

const Template = (args: IDateSelectorComponent): JSX.Element => (
  <DateSelectorComponent {...args} />
)

export const Default: { args: IDateSelectorComponent } = Template.bind({})

export const Error: { args: IDateSelectorComponent } = Template.bind({})

export const Disable: { args: IDateSelectorComponent } = Template.bind({})

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

Error.args = {
  onChangeDate: action('onChangeDate'),
  date: '',
  dateFormat: 'YYYY-MM-DD',
  valueId: '',
  error: 'date selector error default text',
  label: 'Date Selector',
  maxDate: '',
  minDate: '',
  disabled: false,
  required: true,
  inputClassName: '',
  labelClassName: '',
}

Disable.args = {
  date: '',
  valueId: '',
  dateFormat: 'YYYY-MM-DD',
  onChangeDate: action('onChangeDate'),
  error: '',
  label: 'Date Selector',
  maxDate: '',
  minDate: '',
  disabled: true,
  required: false,
  inputClassName: '',
  labelClassName: '',
}

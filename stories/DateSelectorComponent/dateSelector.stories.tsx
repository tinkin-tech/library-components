import * as React from 'react'
import { DateSelector } from './DateSelector'

export default {
  title: 'Date Selector',
  component: DateSelector,
}

type formatType = 'YYYY-MM-DD'

interface PropsInterface {
  id: string
  date: string
  dateFormat: formatType
  onChangeDate: (id: string, value: string) => void
}

const Template = (args: PropsInterface): React.ReactElement => (
  <DateSelector {...args} />
)

export const WithValue = Template.bind({})

WithValue.args = {
  id: 'DateSelectorComponent',
  date: '2020-01-01',
  minDate: '2020-10-11',
  maxDate: '2020-12-25',
  dateFormat: 'YYYY-MM-DD',
  onChangeDate: (): void => null,
}

import * as React from 'react'
import DateSelectorComponent from './DateSelectorComponent'

export default {
  title: 'Date Selector',
  component: DateSelectorComponent,
}

export const WithValue = (): React.ReactNode => {
  return (
    <DateSelectorComponent
      id="dateSelector"
      date="2020-01-02"
      dateFormat="YYYY-MM-DD"
      onChangeDate={(): void => null}
    />
  )
}

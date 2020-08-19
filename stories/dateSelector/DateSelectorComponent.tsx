import * as React from 'react'
import DateUtils from '../../utils/dateUtils'

type FormatDateTypes = 'YYYY-MM-DD'

interface PropsInterface {
  id: string
  date: string
  onChangeDate: (id: string, date: string) => void
  dateFormat: FormatDateTypes
  label?: string
  error?: string
  required?: boolean
  minDate?: string
  maxDate?: string
}

const DateSelectorComponent = (
  props: PropsInterface
): React.ReactElement<PropsInterface> => {
  const { onChangeDate, dateFormat, id, date, minDate, maxDate } = props
  const [separateDate, changeSeparateDate] = React.useState({
    year: '',
    month: '',
    day: '',
  })
  const [selectedValuesState, changeSelectedValuesState] = React.useState([])
  const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
    let dateToChange = { year: '', month: '', day: '' }
    const dateAdded = DateUtils.addDate(minDate || date, dateFormat, 1, 'days')
    const dateAddedTransformed = DateUtils.transformDateStringToDate(
      dateAdded || date,
      dateFormat
    )
    switch (e.currentTarget.id) {
      case 'year':
        dateToChange = {
          year: e.currentTarget.value,
          month: minDate
            ? dateAddedTransformed.getMonth() + 1 >= 10
              ? (dateAddedTransformed.getMonth() + 1).toString()
              : `0${(dateAddedTransformed.getMonth() + 1).toString()}`
            : '01',
          day: minDate
            ? (dateAddedTransformed.getDate() >= 10
                ? dateAddedTransformed.getDate()
                : `0${dateAddedTransformed.getDate()}`
              ).toString()
            : '01',
        }
        changeSeparateDate(dateToChange)
        break
      case 'month':
        dateToChange = {
          ...separateDate,
          month: e.currentTarget.value,
          day: minDate
            ? (dateAddedTransformed.getDate() >= 10
                ? dateAddedTransformed.getDate()
                : `0${dateAddedTransformed.getDate()}`
              ).toString()
            : '01',
        }
        changeSeparateDate(dateToChange)
        break
      case 'day':
        dateToChange = { ...separateDate, day: e.currentTarget.value }
        changeSeparateDate(dateToChange)
        break
    }
    onChangeDate(
      id,
      `${dateToChange.year}-${dateToChange.month}-${dateToChange.day}`
    )
  }

  const getSelectValues = (e: React.FormEvent<HTMLInputElement>): void => {
    const selectedValues: string[] = []
    switch (e.currentTarget.id) {
      case 'year':
        new Array(DateUtils.yearsDiff(maxDate, minDate, dateFormat) + 1)
          .fill(0)
          .forEach((_, index) => {
            const year = DateUtils.getFullYear(minDate, dateFormat)
            selectedValues.push((year + index).toString())
          })
        break
      case 'month':
        new Array(12).fill(0).forEach((item, index) => {
          const month = item + 1 + index
          selectedValues.push(month >= 10 ? month.toString() : `0${month}`)
        })
        break
      case 'day':
        const daysInMonth = DateUtils.getDaysInMonth(date, dateFormat)
        new Array(daysInMonth).fill(0).forEach((item, index) => {
          const day = item + 1 + index
          selectedValues.push(day >= 10 ? day.toString() : `0${day}`)
        })
    }
    changeSelectedValuesState(selectedValues)
  }

  React.useEffect(() => {
    const splitDate = date.split('-')
    changeSeparateDate({
      year: splitDate[0] || '',
      month: splitDate[1] || '',
      day: splitDate[2] || '',
    })
  }, [date])

  return (
    <div data-testid="dateSelectorComponent">
      otnuehut
      <div>oeueoueo</div>
      <input
        data-testid="input-year"
        onChange={onChangeInput}
        id="year"
        value={separateDate.year}
        onClick={getSelectValues}
      />
      <div data-testid="selector-year">
        {selectedValuesState.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      <input
        data-testid="input-month"
        onChange={onChangeInput}
        id="month"
        value={separateDate.month}
        disabled={!separateDate.year}
        onClick={getSelectValues}
      />
      <div data-testid="selector-month">
        {selectedValuesState.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      <input
        data-testid="input-day"
        onChange={onChangeInput}
        id="day"
        value={separateDate.day}
        disabled={!separateDate.month}
        onClick={getSelectValues}
      />
      <div data-testid="selector-day">
        {selectedValuesState.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(DateSelectorComponent)

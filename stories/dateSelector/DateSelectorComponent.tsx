import * as React from 'react'
import DateUtils from '../../utils/dateUtils'
import * as PropTypes from 'prop-types'

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

export const DateSelectorComponent = (
  props: PropsInterface
): React.ReactElement<PropsInterface> => {
  const { onChangeDate, dateFormat, id, date, minDate, maxDate, label } = props
  const [separateDate, changeSeparateDate] = React.useState({
    year: '',
    month: '',
    day: '',
  })
  const [selectedValuesState, changeSelectedValuesState] = React.useState([])
  const [dateState, changeDateState] = React.useState(date)
  const [openSelectors, changeOpenSelectors] = React.useState({
    year: false,
    month: false,
    day: false,
  })
  const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
    let dateToChange = { year: '', month: '', day: '' }
    const dateAdded = DateUtils.addDate(
      minDate || dateState || date,
      dateFormat,
      1,
      'days'
    )
    const dateAddedTransformed = DateUtils.transformDateStringToDate(
      dateAdded || dateState || date,
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
    changeDateState(
      `${dateToChange.year}-${dateToChange.month}-${dateToChange.day}`
    )
    onChangeDate(
      id,
      `${dateToChange.year}-${dateToChange.month}-${dateToChange.day}`
    )
  }

  const getSelectValues = (e: React.FormEvent<HTMLInputElement>): void => {
    const selectedValues: string[] = []
    switch (e.currentTarget.id) {
      case 'year':
        const firstDate =
          maxDate ||
          DateUtils.addDate(date || dateState, dateFormat, 5, 'years')
        const secondDate =
          minDate ||
          DateUtils.substractDate(date || dateState, dateFormat, 5, 'years')
        new Array(DateUtils.yearsDiff(firstDate, secondDate, dateFormat) + 1)
          .fill(0)
          .forEach((_, index) => {
            const year = DateUtils.getFullYear(secondDate, dateFormat)
            selectedValues.push((year + index).toString())
          })
        changeOpenSelectors({
          year: !openSelectors.year,
          month: false,
          day: false,
        })
        break
      case 'month':
        new Array(12).fill(0).forEach((item, index) => {
          const month = item + 1 + index
          selectedValues.push(month >= 10 ? month.toString() : `0${month}`)
        })
        changeOpenSelectors({
          year: false,
          month: !openSelectors.month,
          day: false,
        })
        break
      case 'day':
        const daysInMonth = DateUtils.getDaysInMonth(
          dateState || date,
          dateFormat
        )
        new Array(daysInMonth).fill(0).forEach((item, index) => {
          const day = item + 1 + index
          selectedValues.push(day >= 10 ? day.toString() : `0${day}`)
        })
        changeOpenSelectors({
          year: false,
          month: false,
          day: !openSelectors.day,
        })
    }
    changeSelectedValuesState(selectedValues)
  }

  const selectorComponent = (testId: string): React.ReactElement => (
    <div className="selector" data-testid={testId}>
      {selectedValuesState.map((value, index) => (
        <div key={index} className="select-items">
          {value}
        </div>
      ))}
    </div>
  )

  React.useEffect(() => {
    const splitDate = dateState ? dateState.split('-') : date.split('-')
    changeSeparateDate({
      year: splitDate[0] || '',
      month: splitDate[1] || '',
      day: splitDate[2] || '',
    })
  }, [date])

  return (
    <div className="dateSelectorComponent" data-testid="dateSelectorComponent">
      {label && <div data-testid="label">{label}</div>}
      <div className="dateContainer">
        <input
          data-testid="input-year"
          onChange={onChangeInput}
          id="year"
          value={separateDate.year}
          onClick={getSelectValues}
        />
        {openSelectors.year && selectorComponent('selector-year')}
      </div>
      <div className="dateContainer">
        <input
          data-testid="input-month"
          onChange={onChangeInput}
          id="month"
          value={separateDate.month}
          disabled={!separateDate.year}
          onClick={getSelectValues}
        />
        {openSelectors.month && selectorComponent('selector-month')}
      </div>
      <div className="dateContainer">
        <input
          data-testid="input-day"
          onChange={onChangeInput}
          id="day"
          value={separateDate.day}
          disabled={!separateDate.month}
          onClick={getSelectValues}
        />
        {openSelectors.day && selectorComponent('selector-day')}
      </div>
    </div>
  )
}

DateSelectorComponent.propsTypes = {
  id: PropTypes.string,
}

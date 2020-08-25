import * as React from 'react'

import DateUtils from '../../utils/dateUtils'
import { LabelComponent } from '../label/Label'

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
  disable?: boolean
}

export const DateSelector = (
  props: PropsInterface
): React.ReactElement<PropsInterface> => {
  const {
    onChangeDate,
    dateFormat,
    id,
    date,
    minDate,
    maxDate,
    label,
    disable,
    required,
    error,
  } = props
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
  const onChangeInput = (
    e?: React.FormEvent<HTMLInputElement>,
    idInput?: string,
    valueInput?: string
  ): void => {
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
    switch (e?.currentTarget?.id || idInput) {
      case 'year':
        dateToChange = {
          year: e?.currentTarget?.value || valueInput,
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
          month: e?.currentTarget?.value || valueInput,
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
        dateToChange = {
          ...separateDate,
          day: e?.currentTarget?.value || valueInput,
        }
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
    const firstDate =
      maxDate || DateUtils.addDate(date || dateState, dateFormat, 5, 'years')
    switch (e.currentTarget.id) {
      case 'year':
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
        const monthsDiff = DateUtils.monthsDiff(
          firstDate,
          dateState || date,
          dateFormat
        )
        const months = monthsDiff + 1 > 12 ? 12 : monthsDiff + 1
        new Array(months).fill(0).forEach((item, index) => {
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
        const dateForCompare = DateUtils.setDay(
          dateState || date,
          dateFormat,
          1
        )
        const daysInMonth = DateUtils.getDaysInMonth(
          dateState || date,
          dateFormat
        )
        const daysDiff = DateUtils.daysDiff(
          firstDate,
          dateForCompare,
          dateFormat
        )
        const days = daysDiff + 1 >= daysInMonth ? daysInMonth : daysDiff + 1
        new Array(days).fill(0).forEach((item, index) => {
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

  const selectorComponent = (
    testId: string,
    inputId: string
  ): React.ReactElement => (
    <div className="selector app-scroll shadow-2" data-testid={testId}>
      {selectedValuesState.map((value, index) => {
        const handleOnClickSelectItem = (): void => {
          onChangeInput(null, inputId, value)
          changeOpenSelectors({ ...openSelectors, [inputId]: false })
        }
        return (
          <div
            key={index}
            className="select-items"
            data-testid={`${testId}-item-${index}`}
            onClick={handleOnClickSelectItem}
          >
            {value}
          </div>
        )
      })}
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

  const selectOptions = React.useRef()

  React.useEffect(() => {
    const eventListener = (e: Event): void => {
      if (
        e.target !== selectOptions.current &&
        (openSelectors.day || openSelectors.month || openSelectors.year)
      ) {
        changeOpenSelectors({ day: false, month: false, year: false })
      }
    }
    window.addEventListener('click', eventListener)
    return (): void => window.removeEventListener('click', eventListener)
  })

  return (
    <div
      className={`dateSelectorComponent`}
      data-testid="dateSelectorComponent"
      ref={selectOptions}
    >
      <div className="flex-space-between">
        <LabelComponent
          label={label}
          required={required}
          error={!!error}
          referenceId={id}
        />
        {error && <span className="icon-warning-content">&#9888;</span>}
      </div>
      <div className="dateSelectorContent">
        <div className="dateContainer">
          <div className="dateContent flex-row flex-middle">
            <span className="inputContent flex-column flex-1">
              <input
                data-testid="input-year"
                onChange={onChangeInput}
                id="year"
                value={separateDate.year}
                onClick={getSelectValues}
                disabled={disable}
                placeholder="YYYY"
              />
            </span>
            <span className="iconContent p-r flex-column">
              <i
                className={`arrow down ${openSelectors.year ? 'active' : ''}`}
              />
            </span>
          </div>
          {openSelectors.year && selectorComponent('selector-year', 'year')}
        </div>
        <div className="dateContainer">
          <input
            data-testid="input-month"
            onChange={onChangeInput}
            id="month"
            value={separateDate.month}
            disabled={!separateDate.year || disable}
            onClick={getSelectValues}
            placeholder="MM"
          />
          {openSelectors.month && selectorComponent('selector-month', 'month')}
        </div>
        <div className="dateContainer">
          <input
            data-testid="input-day"
            onChange={onChangeInput}
            id="day"
            value={separateDate.day}
            disabled={!separateDate.month || disable}
            onClick={getSelectValues}
            placeholder="DD"
          />
          {openSelectors.day && selectorComponent('selector-day', 'day')}
        </div>
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

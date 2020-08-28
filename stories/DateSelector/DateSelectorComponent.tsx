import * as React from 'react'
import language from './language/es_EC'
import DateUtils from '../../utils/dateUtils/dateUtils'

type dateFormatType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD'

interface IDateSelectorComponent {
  dateFormat: dateFormatType
  minDate?: string
  maxDate?: string
  date: string
  valueId: string
  label?: string
  onChangeDate: (date: string, valueId: string) => void
  error?: string
  required?: boolean
  labelClassName?: string
  inputClassName?: string
}

const DateSelectorComponent = (
  props: IDateSelectorComponent
): React.ReactElement => {
  const {
    dateFormat,
    minDate,
    maxDate,
    date,
    onChangeDate,
    valueId,
    label,
    error,
    required,
    labelClassName,
    inputClassName,
  } = props
  const defaultMinDate =
    minDate ||
    DateUtils.substractDate(
      DateUtils.formatDate(new Date(), null, dateFormat),
      dateFormat,
      2,
      'years'
    )
  const defaultMaxDate =
    maxDate ||
    DateUtils.addDate(
      DateUtils.formatDate(new Date(), null, dateFormat),
      dateFormat,
      2,
      'years'
    )

  const defaultDate = { year: '', month: '', day: '' }

  const dateObject = date
    ? DateUtils.dateStringToObject(date, dateFormat)
    : defaultDate

  const defaultSelectors = {
    year: false,
    month: false,
    day: false,
  }

  const minDateObject = DateUtils.dateStringToObject(defaultMinDate, dateFormat)
  const maxDateObject = DateUtils.dateStringToObject(defaultMaxDate, dateFormat)

  const [openSelectors, changeOpenSelectors] = React.useState(defaultSelectors)

  const changeDateValue = (dateKey: string, value: string): void => {
    changeOpenSelectors(defaultSelectors)
    let dateToUpdate = null
    if (dateKey === 'year') {
      dateToUpdate = {
        year: value,
        month: value === minDateObject.year ? minDateObject.month : '01',
        day: value === minDateObject.year ? minDateObject.day : '01',
      }
    } else if (dateKey === 'month') {
      dateToUpdate = {
        ...dateObject,
        month: value,
        day:
          dateObject.year === minDateObject.year &&
          value === minDateObject.month
            ? minDateObject.day
            : '01',
      }
    } else {
      dateToUpdate = { ...dateObject, [dateKey]: value }
    }

    const newDate = DateUtils.dateFormatToObject(dateFormat)
      .reduce((cumulator, value) => {
        cumulator.push(dateToUpdate[DateUtils.dateKeys[value]])
        return cumulator
      }, [])
      .join('-')

    onChangeDate(newDate, valueId)
  }

  const getYears = (): Array<string> => {
    return [
      ...new Array(+maxDateObject.year - +minDateObject.year + 1),
    ].map((_, index) => (+minDateObject.year + index).toString())
  }

  const getMonths = (): Array<string> => {
    return [...new Array(12)]
      .map((_, index) => `${index + 1 < 10 ? 0 : ''}${index + 1}`)
      .filter((_, key) => {
        const isGreater = +minDateObject.month <= key + 1
        const isLower = +maxDateObject.month >= key + 1
        if (
          minDateObject.year === dateObject.year &&
          maxDateObject.year === dateObject.year
        ) {
          return isGreater && isLower
        } else if (minDateObject.year === dateObject.year) {
          return isGreater
        } else if (maxDateObject.year === dateObject.year) {
          return isLower
        }
        return true
      })
  }

  const getDays = (): Array<string> => {
    const totalDays = DateUtils.getDaysInMonth(
      `${dateObject.year}-${dateObject.month}`,
      'YYYY-MM'
    )
    return [...new Array(totalDays)]
      .map((_, index) => `${index + 1 < 10 ? 0 : ''}${index + 1}`)
      .filter((_, key) => {
        const isGreater = +minDateObject.day <= key + 1
        const isLower = +maxDateObject.day >= key + 1
        if (
          minDateObject.year === dateObject.year &&
          maxDateObject.year === dateObject.year &&
          minDateObject.month === dateObject.month &&
          maxDateObject.month === dateObject.month
        ) {
          return isGreater && isLower
        } else if (
          minDateObject.year === dateObject.year &&
          minDateObject.month === dateObject.month
        ) {
          return isGreater
        } else if (
          maxDateObject.year === dateObject.year &&
          maxDateObject.month === dateObject.month
        ) {
          return isLower
        }
        return true
      })
  }

  const renderDateSelectors = (): React.ReactElement => {
    const yearSelector = (
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={(): void =>
            changeOpenSelectors({ ...openSelectors, year: !openSelectors.year })
          }
        >
          {dateObject.year || language.YYYY}
        </a>
        {openSelectors.year && (
          <ul className="selector-options">
            {getYears().map((year, key) => (
              <li key={key}>
                <a onClick={(): void => changeDateValue('year', year)}>
                  {year}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
    const dateFormatObject = DateUtils.dateFormatToObject(dateFormat)
    const monthSelector = (
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={(): void =>
            !dateFormatObject.find((dateKey) => dateKey === 'YYYY') ||
            dateObject.year
              ? changeOpenSelectors({
                  ...openSelectors,
                  month: !openSelectors.month,
                })
              : null
          }
        >
          {dateObject.month || language.MM}
        </a>
        {openSelectors.month && (
          <ul className="selector-options">
            {getMonths().map((month, key) => (
              <li key={key}>
                <a onClick={(): void => changeDateValue('month', month)}>
                  {month}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
    const daySelector = (
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={(): void =>
            dateObject.year
              ? changeOpenSelectors({
                  ...openSelectors,
                  day: !openSelectors.day,
                })
              : null
          }
        >
          {dateObject.day || language.DD}
        </a>
        {openSelectors.day && (
          <ul className="selector-options">
            {getDays().map((day, key) => (
              <li key={key}>
                <a onClick={(): void => changeDateValue('day', day)}>{day}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
    switch (dateFormat) {
      case 'YYYY-MM-DD':
        return (
          <>
            {yearSelector}
            {monthSelector}
            {daySelector}
          </>
        )
      case 'YYYY-MM':
        return (
          <>
            {yearSelector}
            {monthSelector}
          </>
        )
      case 'MM-DD':
        return (
          <>
            {monthSelector}
            {daySelector}
          </>
        )
    }
  }
  return (
    <div className="date-selector-component">
      <label
        className={`${labelClassName || 'label'}${error ? ' label-error' : ''}`}
        htmlFor={valueId}
        data-testid="label-component"
      >
        {`${label || ''}${required ? '*' : ''}`}&nbsp;
      </label>
      <div
        className={`${inputClassName || 'date-selector-content'}${
          error ? ' date-selector-error' : ''
        }`}
      >
        {renderDateSelectors()}
      </div>
      <span>{error}</span>
    </div>
  )
}

export default DateSelectorComponent

import * as React from 'react'
import language from './language/es_EC'
import DateUtils from '../../utils/dateUtils/dateUtils'

type dateFormatType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD'

export interface IDateSelectorComponent {
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
  disabled?: boolean
}

export const DateSelectorComponent = (
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
    disabled,
  } = props
  const currentDate = DateUtils.formatDate(new Date(), null, dateFormat)
  const dateSelectRef = React.useRef(null)
  const diffDays = 2
  const defaultMinDate =
    minDate ||
    DateUtils.substractDate(currentDate, dateFormat, diffDays, 'years')
  const defaultMaxDate =
    maxDate || DateUtils.addDate(currentDate, dateFormat, diffDays, 'years')

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

    const newDate = DateUtils.dateFormatToArray(dateFormat)
      .map((value) => dateToUpdate[DateUtils.dateKeys[value]])
      .join('-')

    onChangeDate(newDate, valueId)
  }

  const getYears = (): Array<string> =>
    [
      ...new Array(+maxDateObject.year - +minDateObject.year + 1),
    ].map((_, index) => (+minDateObject.year + index).toString())

  const getMonths = (): Array<string> => {
    const monthsInAYear = 12
    const limitSetZeroNumber = 10
    return [...new Array(monthsInAYear)]
      .map(
        (_, index) => `${index + 1 < limitSetZeroNumber ? 0 : ''}${index + 1}`
      )
      .filter((_, key) => {
        const isGreater = +minDateObject.month <= key + 1
        const isLower = +maxDateObject.month >= key + 1
        if (
          dateObject.year &&
          minDateObject.year === dateObject.year &&
          maxDateObject.year === dateObject.year
        ) {
          return isGreater && isLower
        } else if (minDateObject.year === dateObject.year && dateObject.year) {
          return isGreater
        } else if (maxDateObject.year === dateObject.year && dateObject.year) {
          return isLower
        }
        return true
      })
  }

  const getDays = (): Array<string> => {
    const defaultYear = new Date().getFullYear().toString()
    const totalDays = DateUtils.getDaysInMonth(
      `${dateObject.year || defaultYear}-${dateObject.month}`,
      'YYYY-MM'
    )
    const limitSetZeroNumber = 10
    return [...new Array(totalDays)]
      .map(
        (_, index) => `${index + 1 < limitSetZeroNumber ? 0 : ''}${index + 1}`
      )
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
            disabled
              ? null
              : changeOpenSelectors({
                  day: false,
                  month: false,
                  year: !openSelectors.year,
                })
          }
        >
          {dateObject.year || language.YYYY}
          <i className="icon-arrow-down" />
        </a>
        {openSelectors.year && (
          <ul className="selector-options">
            {getYears().map((year, key) => (
              <li key={key} className="selector-item">
                <a onClick={(): void => changeDateValue('year', year)}>
                  {year}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
    const dateFormatObject = DateUtils.dateFormatToArray(dateFormat)
    const monthSelector = (
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={(): void =>
            (!dateFormatObject.find((dateKey) => dateKey === 'YYYY') ||
              dateObject.year) &&
            !disabled
              ? changeOpenSelectors({
                  day: false,
                  year: false,
                  month: !openSelectors.month,
                })
              : null
          }
        >
          {dateObject.month || language.MM}
          <i className="icon-arrow-down" />
        </a>
        {openSelectors.month && (
          <ul className="selector-options">
            {getMonths().map((month, key) => (
              <li key={key} className="selector-item">
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
            (dateObject.year || dateObject.month) && !disabled
              ? changeOpenSelectors({
                  month: false,
                  year: false,
                  day: !openSelectors.day,
                })
              : null
          }
        >
          {dateObject.day || language.DD}
          <i className="icon-arrow-down" />
        </a>
        {openSelectors.day && (
          <ul className="selector-options">
            {getDays().map((day, key) => (
              <li key={key} className="selector-item">
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

  const handleClickOutside = (event: Event): void => {
    if (!dateSelectRef.current.contains(event.target)) {
      changeOpenSelectors({
        day: false,
        year: false,
        month: false,
      })
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return (): void => document.removeEventListener('click', handleClickOutside)
  })

  return (
    <div
      className={`date-selector-component ${
        disabled ? 'date-selector-component-disabled' : ''
      }`}
      ref={dateSelectRef}
    >
      {label ? (
        <label
          className={`${labelClassName || 'label'}${
            error ? ' label-error' : ''
          }`}
          htmlFor={valueId}
        >
          {`${label}${required ? '*' : ''}`}
        </label>
      ) : null}
      <div
        className={`${inputClassName || 'date-selector-content'}${
          error ? ' date-selector-error' : ''
        }`}
      >
        {renderDateSelectors()}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  )
}

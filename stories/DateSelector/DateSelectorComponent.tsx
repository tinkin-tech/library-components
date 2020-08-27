import * as React from 'react'
import language from './language/es_EC'
import DateUtils from '../../utils/dateUtils'

type dateFormatType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD'

interface IDateSelectorComponent {
  dateFormat: dateFormatType
  minDate?: string
}

const DateSelectorComponent = (
  props: IDateSelectorComponent
): React.ReactElement => {
  const { dateFormat, minDate } = props
  const defaultMinDate =
    minDate ||
    DateUtils.substractDate(
      DateUtils.formatDate(new Date(), null, dateFormat),
      dateFormat,
      2,
      'years'
    )
  const defaultSelectors = {
    year: false,
    month: false,
    day: false,
  }

  const minDateObject = DateUtils.dateStringToObject(defaultMinDate, dateFormat)

  const [openSelectors, changeOpenSelectors] = React.useState(defaultSelectors)

  const [selectDate, changeSelectDate] = React.useState({
    year: null,
    month: null,
    day: null,
  })
  const changeDateValue = (dateKey: string, value: string): void => {
    changeOpenSelectors(defaultSelectors)
    if (dateKey === 'year' && value === minDateObject.year) {
      changeSelectDate({
        year: value,
        month: minDateObject.month,
        day: minDateObject.day,
      })
    } else {
      changeSelectDate({ ...selectDate, [dateKey]: value })
    }
  }

  const getYears = (): Array<string> => {
    return [...new Array(5)].map((_, index) =>
      (+minDateObject.year + index).toString()
    )
  }

  const getMonths = (): Array<string> => {
    return [...new Array(12)]
      .map((_, index) => `${index + 1 < 10 ? 0 : ''}${index + 1}`)
      .filter((value) => {
        return (
          selectDate.year !== minDateObject.year ||
          +value >= +minDateObject.month
        )
      })
  }

  const getDays = (): Array<string> => {
    const totalDays = DateUtils.getDaysInMonth(
      `${selectDate.year}-${selectDate.month}`,
      'YYYY-MM'
    )
    return selectDate.year && selectDate.month && totalDays
      ? [...new Array(totalDays)]
          .map((_, index) => `${index + 1 < 10 ? 0 : ''}${index + 1}`)
          .filter((value) => {
            const currentIsGreater = DateUtils.compareDates(
              `${selectDate.year}-${selectDate.month}`,
              'YYYY-MM',
              `${minDateObject.year}-${minDateObject.month}`,
              'greater'
            )
            return currentIsGreater || +value >= +minDateObject.day
          })
      : []
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
          {selectDate.year || language.YYYY}
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
    const monthSelector = (
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={(): void =>
            changeOpenSelectors({
              ...openSelectors,
              month: !openSelectors.month,
            })
          }
        >
          {selectDate.month || language.MM}
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
            changeOpenSelectors({ ...openSelectors, day: !openSelectors.day })
          }
        >
          {selectDate.day || language.DD}
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
  return <div className="date-selector-component">{renderDateSelectors()}</div>
}

export default DateSelectorComponent

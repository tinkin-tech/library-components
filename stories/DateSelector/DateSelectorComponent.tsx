import * as React from 'react'
import language from './language/es_EC'

type dateFormatType = 'YYYY-MM-DD' | 'YYYY-MM' | 'MM-DD'

interface IDateSelectorComponent {
  dateFormat: dateFormatType
}

const DateSelectorComponent = (
  props: IDateSelectorComponent
): React.ReactElement => {
  const { dateFormat } = props

  const [yearsList] = React.useState(['2018', '2019', '2020', '2021'])
  const [monthsList] = React.useState(['01', '02', '03', '05', '06'])
  const [daysList] = React.useState(['01', '02', '03', '05', '26'])

  const defaultSelectors = {
    year: false,
    month: false,
    day: false,
  }

  const [openSelectors, changeOpenSelectors] = React.useState(defaultSelectors)

  const [selectDate, changeSelectDate] = React.useState({
    year: null,
    month: null,
    day: null,
  })
  const changeDateValue = (dateKey: string, value: string): void => {
    changeOpenSelectors(defaultSelectors)
    changeSelectDate({ ...selectDate, [dateKey]: value })
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
            {yearsList.map((year, key) => (
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
            {monthsList.map((month, key) => (
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
            {daysList.map((day, key) => (
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

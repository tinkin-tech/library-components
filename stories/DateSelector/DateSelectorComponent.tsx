import * as React from 'react'
import language from './language/es_EC'

const DateSelectorComponent = () => {
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
  const changeDateValue = (dateKey: string, value: string) => {
    changeOpenSelectors(defaultSelectors)
    changeSelectDate({ ...selectDate, [dateKey]: value })
  }
  return (
    <div className="date-selector-component">
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={() =>
            changeOpenSelectors({ ...openSelectors, year: !openSelectors.year })
          }
        >
          {selectDate.year || language.YYYY}
        </a>
        {openSelectors.year && (
          <ul className="selector-options">
            {yearsList.map((year, key) => (
              <li key={key}>
                <a onClick={() => changeDateValue('year', year)}>{year}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={() =>
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
                <a onClick={() => changeDateValue('month', month)}>{month}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="date-selector">
        <a
          className="selector-value"
          onClick={() =>
            changeOpenSelectors({ ...openSelectors, day: !openSelectors.day })
          }
        >
          {selectDate.day || language.DD}
        </a>
        {openSelectors.day && (
          <ul className="selector-options">
            {daysList.map((day, key) => (
              <li key={key}>
                <a onClick={() => changeDateValue('day', day)}>{day}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default DateSelectorComponent

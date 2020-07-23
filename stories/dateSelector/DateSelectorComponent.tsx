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
  const { onChangeDate, id, date } = props
  const [separateDate, changeSeparateDate] = React.useState({
    year: '',
    month: '',
    day: '',
  })
  const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
    let dateToChange = { year: '', month: '', day: '' }
    switch (e.currentTarget.id) {
      case 'year':
        dateToChange = { year: e.currentTarget.value, month: '', day: '' }
        changeSeparateDate(dateToChange)
        break
      case 'month':
        dateToChange = {
          ...separateDate,
          month: e.currentTarget.value,
          day: '',
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
      />
      <input
        data-testid="input-month"
        onChange={onChangeInput}
        id="month"
        value={separateDate.month}
        disabled={!separateDate.year}
      />
      <input
        data-testid="input-day"
        onChange={onChangeInput}
        id="day"
        value={separateDate.day}
        disabled={!separateDate.month}
      />
    </div>
  )
}

export default React.memo(DateSelectorComponent)

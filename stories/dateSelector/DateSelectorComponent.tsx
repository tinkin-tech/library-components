import * as React from 'react'

type FormatDateTypes =
  | 'DD-MM-YYYY'
  | 'DD-MM'
  | 'MM-YYYY'
  | 'YYYY-MM-DD'
  | 'YYYY-MM'
  | 'YYYY'

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
  const { onChangeDate, id } = props

  /* const changeYear = (year: string): string => {

     } */
  const onChangeInput = (e: React.FormEvent<HTMLInputElement>): void => {
    onChangeDate(id, e.currentTarget.value)
  }

  return (
    <div data-testid="dateSelectorComponent">
      otnuehut
      <div>oeueoueo</div>
      <input data-testid="input-year" onChange={onChangeInput} />
    </div>
  )
}

export default React.memo(DateSelectorComponent)

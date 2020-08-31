import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

interface CheckboxComponentPropsInterface {
  options: CheckboxOption[]
  values?: string[]
  onChangeValues?: (values: string[]) => void
}

const CheckboxComponent: React.FC<CheckboxComponentPropsInterface> = (
  props: CheckboxComponentPropsInterface
) => {
  const { options, values = [], onChangeValues } = props

  const [selectedValues, onChangeSelectedValues] = React.useState(values)

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = selectedValues.find((value) => value === event.target.id)
      ? selectedValues.filter((value) => value !== event.target.id)
      : [...selectedValues, event.target.id]
    onChangeSelectedValues(newValues)
    onChangeValues(newValues)
  }
  return (
    <>
      {options.map((option) => (
        <>
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!selectedValues.find((value) => value === option.id)}
            onChange={onChangeAction}
          />
          <label htmlFor={option.id.toString()}>{option.label}</label>
        </>
      ))}
    </>
  )
}

export default CheckboxComponent

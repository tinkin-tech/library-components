import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

interface CheckboxComponentPropsInterface {
  options: CheckboxOption[]
  values?: string[]
  onChangeValues?: (values: string[], valueId: string) => void
  disabled?: boolean
  label?: string
  listItemClassName?: string
  labelClassName?: string
  error?: string
}

const CheckboxComponent: React.FC<CheckboxComponentPropsInterface> = (
  props: CheckboxComponentPropsInterface
) => {
  const {
    options,
    values = [],
    onChangeValues,
    disabled,
    label,
    listItemClassName,
    labelClassName,
    error,
  } = props

  const [selectedValues, onChangeSelectedValues] = React.useState(values)

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = selectedValues.find((value) => value === event.target.id)
      ? selectedValues.filter((value) => value !== event.target.id)
      : [...selectedValues, event.target.id]
    onChangeSelectedValues(newValues)
    onChangeValues(newValues, event.target.id)
  }
  return (
    <div className={disabled ? 'disabled-checklist' : ''}>
      {label && <label>{label}</label>}
      {options.map((option) => (
        // eslint-disable-next-line react/jsx-key
        <div className={listItemClassName || 'check-list-item'}>
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!selectedValues.find((value) => value === option.id)}
            onChange={disabled ? null : onChangeAction}
          />
          <label
            htmlFor={option.id.toString()}
            className={labelClassName || 'label'}
          >
            {option.label}
          </label>
        </div>
      ))}
      <div>{error || ''}</div>
    </div>
  )
}

export default CheckboxComponent

import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

interface ICheckboxComponent {
  options: CheckboxOption[]
  values: string[]
  onChangeValues: (values: string[], valueId: string) => void
  valueId?: string
  disabled?: boolean
  label?: string
  listItemClassName?: string
  labelClassName?: string
  error?: string
  required?: boolean
  extraListItemClassName?: string
  extraLabelClassName?: string
}

const CheckboxComponent: React.FC<ICheckboxComponent> = (
  props: ICheckboxComponent
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
    required,
    extraListItemClassName,
    extraLabelClassName,
    valueId,
  } = props

  const [selectedValues, onChangeSelectedValues] = React.useState(values)

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = selectedValues.find((value) => value === event.target.id)
      ? selectedValues.filter((value) => value !== event.target.id)
      : [...selectedValues, event.target.id]
    onChangeSelectedValues(newValues)
    onChangeValues(newValues, valueId)
  }
  return (
    <div className={disabled ? 'disabled-checklist' : ''}>
      {label && (
        <label
          className={`${labelClassName || 'label'} ${
            extraLabelClassName || ''
          }`}
        >
          {label}
          {required ? '*' : ''}
        </label>
      )}
      {options.map((option) => (
        // eslint-disable-next-line react/jsx-key
        <div
          className={`${listItemClassName || 'check-list-item'} ${
            extraListItemClassName || ''
          } ${
            selectedValues.find((value) => value === option.id)
              ? 'selected'
              : ''
          }`}
        >
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!selectedValues.find((value) => value === option.id)}
            onChange={disabled ? null : onChangeAction}
          />
          <label htmlFor={option.id.toString()}>{option.label}</label>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  )
}

export default CheckboxComponent

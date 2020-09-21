import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

export interface ICheckboxComponent {
  options: CheckboxOption[]
  values: string[]
  onChangeValues: (values: string[], valueId: string) => void
  valueId: string
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
    values,
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

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (disabled) {
      return null
    }
    const newValues = values.find((value) => value === event.target.id)
      ? values.filter((value) => value !== event.target.id)
      : [...values, event.target.id]
    onChangeValues(newValues, valueId)
  }

  const checkboxClass = [
    'checkbox-component',
    disabled && 'disabled-checklist',
    error && 'checkbox-component-error',
  ]

  const labelClass = [
    labelClassName || 'label',
    extraLabelClassName || '',
    error && 'label-error',
    disabled && 'disable',
  ]

  return (
    <div className={`${checkboxClass.join(' ')}`}>
      {label && (
        <div className={`${labelClass.join(' ')}`}>
          {label}
          {required ? '*' : ''}
        </div>
      )}
      {options.map((option, key) => (
        <div
          key={key}
          className={`${listItemClassName || 'check-list-item'} ${
            extraListItemClassName || ''
          } ${values.find((value) => value === option.id) ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!values.find((value) => value === option.id)}
            onChange={onChangeAction}
          />
          <label htmlFor={option.id.toString()}>{option.label}</label>
        </div>
      ))}
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default CheckboxComponent

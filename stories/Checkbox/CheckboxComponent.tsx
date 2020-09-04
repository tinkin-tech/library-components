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

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = values.find((value) => value === event.target.id)
      ? values.filter((value) => value !== event.target.id)
      : [...values, event.target.id]
    onChangeValues(newValues, valueId)
  }
  return (
    <div
      className={`${disabled ? 'disabled-checklist' : ''} ${
        error && 'checkbox-component-error'
      }`}
    >
      {label && (
        <label
          className={`${labelClassName || 'label'} ${
            extraLabelClassName || ''
          }${error && 'label-error'}`}
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
          } ${values.find((value) => value === option.id) ? 'selected' : ''}`}
        >
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!values.find((value) => value === option.id)}
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

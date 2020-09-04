import * as React from 'react'

type RadioOption = {
  id: string | number
  label: string
}

interface IRadioButtonComponent {
  options: RadioOption[]
  value: string
  onChangeValue: (id: string, valueId: string) => void
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

const RadioButtonComponent: React.FC<IRadioButtonComponent> = (
  props: IRadioButtonComponent
) => {
  const {
    options,
    value,
    onChangeValue,
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
    const newValue = event.target.id === value ? null : event.target.id
    onChangeValue(newValue, valueId)
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
      {options.map((option, key) => (
        <div
          key={key}
          className={`${listItemClassName || 'check-list-item'} ${
            extraListItemClassName || ''
          } ${value === option.id ? 'selected' : ''}`}
        >
          <input
            type="radio"
            id={option.id.toString()}
            checked={value === option.id.toString()}
            onChange={disabled ? null : onChangeAction}
          />
          <label
            htmlFor={option.id.toString()}
            className={`${labelClassName || 'label'} ${
              extraLabelClassName || ''
            }`}
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  )
}

export default RadioButtonComponent

import * as React from 'react'

type RadioOption = {
  id: string | number
  label: string
}

export interface IRadioButtonComponent {
  options: RadioOption[]
  value: string
  onChangeValue: (id: string, valueId: string) => void
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
    if (disabled || event.target.id === value) {
      return null
    }
    onChangeValue(event.target.id, valueId)
  }

  const radioButtonClass = [
    'radio-button-component',
    disabled && 'disabled-radio-button',
    error && 'radio-button-component-error',
  ]

  const labelClass = [
    labelClassName || 'label',
    extraLabelClassName || '',
    error && 'label-error',
    disabled && 'disable',
  ]

  return (
    <div className={`${radioButtonClass.join(' ')}`}>
      {label && (
        <div className={`${labelClass.join(' ')}`}>
          {label}
          {required ? '*' : ''}
        </div>
      )}
      {options.map((option, key) => (
        <div
          key={key}
          className={`${listItemClassName || 'radio-list-item'} ${
            extraListItemClassName || ''
          } ${value === option.id ? 'selected' : ''}`}
        >
          <input
            type="radio"
            id={option.id.toString()}
            checked={value === option.id.toString()}
            onChange={onChangeAction}
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
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default RadioButtonComponent

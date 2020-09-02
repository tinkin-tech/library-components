import * as React from 'react'

type RadioOption = {
  id: string | number
  label: string
}

interface IRadioButtonComponent {
  options: RadioOption[]
  value?: string
  onChangeValue?: (id: string, valueId: string) => void
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

  const [selectedValue, onChangeSelectedValue] = React.useState(value)

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.id === selectedValue ? null : event.target.id
    onChangeSelectedValue(newValue)
    onChangeValue(newValue, valueId)
  }
  return (
    <div className={disabled ? 'disabled-checklist' : ''}>
      {label && (
        <label>
          {label}
          {required ? '*' : ''}
        </label>
      )}
      {options.map((option) => (
        // eslint-disable-next-line react/jsx-key
        <div
          className={`${listItemClassName || 'check-list-item'} ${
            extraListItemClassName || ''
          } ${selectedValue === option.id ? 'selected' : ''}`}
        >
          <input
            type="radio"
            id={option.id.toString()}
            checked={selectedValue === option.id.toString()}
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

import * as React from 'react'

type RadioOption = {
  id: string | number
  label: string
}

interface RadioButtonComponentPropsInterface {
  options: RadioOption[]
  value?: string
  onChangeValue?: (valueId: string) => void
  disabled?: boolean
  label?: string
  listItemClassName?: string
  labelClassName?: string
  error?: string
  required?: boolean
  extraListItemClassName?: string
  extraLabelClassName?: string
}

const RadioButtonComponent: React.FC<RadioButtonComponentPropsInterface> = (
  props: RadioButtonComponentPropsInterface
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
  } = props

  const [selectedValue, onChangeSelectedValue] = React.useState(value)

  const onChangeAction = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.id === selectedValue ? null : event.target.id
    onChangeSelectedValue(newValue)
    onChangeValue(newValue)
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
          }`}
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
      <div>{error || ''}</div>
    </div>
  )
}

export default RadioButtonComponent

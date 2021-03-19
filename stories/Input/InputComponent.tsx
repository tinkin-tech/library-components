import * as React from 'react'

import language from './language/es_EC'

export type IInputTypes = 'text' | 'email' | 'number' | 'password'

export interface InputComponentPropsInterface {
  valueId: string
  value: string
  onChangeValue: (value: string, valueId: string) => void
  type?: IInputTypes
  label?: string
  required?: boolean
  placeholder?: string
  error?: string
  bottomDescription?: JSX.Element
  labelClassName?: string
  inputClassName?: string
  readOnly?: boolean
  textArea?: boolean
  maxLength?: number
  icon?: JSX.Element
}

export const InputComponent: React.FC<InputComponentPropsInterface> = (
  props: InputComponentPropsInterface
) => {
  const {
    value,
    valueId,
    onChangeValue,
    type,
    label,
    required,
    error,
    placeholder,
    labelClassName,
    inputClassName,
    readOnly,
    textArea,
    bottomDescription,
    maxLength,
    icon,
  } = props

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!maxLength || event.currentTarget.value.length <= maxLength) {
      let currentValue = event.currentTarget.value
      switch (type) {
        case 'number':
          currentValue = currentValue.replace(/[^\d.-]/g, '')
          break
        default:
          break
      }
      onChangeValue(currentValue, valueId)
    }
  }

  const propsComponent = {
    id: valueId,
    name: valueId,
    value: value || '',
    autoComplete: 'off',
    spellCheck: false,
    onChange: readOnly ? null : onChangeAction,
    type: type === 'number' || !type ? 'text' : type,
    placeholder: placeholder || language.placeholder,
    className: `${inputClassName || ''} ${error ? 'warning' : ''}`,
    disabled: readOnly,
  }

  const labelClassNameObject = [
    labelClassName || 'label',
    error ? 'warning' : '',
    readOnly ? 'disable' : '',
  ].filter((item) => item)

  return (
    <div className={`input-component${readOnly ? ' disabled' : ''}`}>
      <div className="flex-space-between">
        {label && (
          <label className={labelClassNameObject.join(' ')} htmlFor={valueId}>
            {`${label}${required ? '*' : ''}`}
          </label>
        )}
        {error && <span className="warning-content">&#9888;</span>}
      </div>
      {textArea ? (
        <textarea {...propsComponent} />
      ) : (
        <input {...propsComponent} />
      )}
      {icon && <div className="icon-container">{icon}</div>}
      {!!(bottomDescription && !error) && bottomDescription}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

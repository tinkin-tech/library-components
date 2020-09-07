import * as React from 'react'
import language from './language/es_EC'

export type IInputTypes = 'text' | 'email' | 'number' | 'password'

export interface InputComponentPropsInterface {
  valueId: string
  value: string
  onChangeValue: (value: string, valueId: string) => void
  type: IInputTypes
  label?: string
  required?: boolean
  placeholder?: string
  error?: string
  labelClassName?: string
  inputClassName?: string
  readOnly?: boolean
  textArea?: boolean
}

const InputComponent: React.FC<InputComponentPropsInterface> = (
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
  } = props

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    let currentValue = event.currentTarget.value
    if (type === 'number') {
      currentValue = currentValue.replace(/[^\d.-]/g, '')
    }
    onChangeValue(currentValue, valueId)
  }

  const propsComponent = {
    id: valueId,
    name: valueId,
    value: value || '',
    autoComplete: 'off',
    spellCheck: false,
    onChange: readOnly ? null : onChangeAction,
    type: type === 'number' ? 'text' : type,
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
          <label
            className={labelClassNameObject.join(' ')}
            htmlFor={valueId}
            data-testid="label-component"
          >
            {`${label || ''}${required ? '*' : ''}`}
          </label>
        )}
        {error && <span className="warning-content">&#9888;</span>}
      </div>
      {textArea ? (
        <textarea {...propsComponent} />
      ) : (
        <input {...propsComponent} />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default InputComponent

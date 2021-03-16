import * as React from 'react'

import language from './language/es_EC'
import { SvgImport } from '../../utils/imageUtils/SvgImport'

export type IInputTypes = 'text' | 'email' | 'number' | 'password' | 'date'

export type IIconPositionType = 'right' | 'left'

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
  icon?: string
  iconPosition?: IIconPositionType
  iconStyle?: string
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
    iconPosition,
    iconStyle,
  } = props

  const tranformValueToValueDate = (value: string): string => {
    const LIMIT_STRING_LENGTH_WITH_SLASH = 3
    const LIMIT_STRING_LENGTH_FOR_CUT = 2
    const MAX_STRING_LENGTH = 4
    let currentValue = value.replace(/\//g, '')
    const limitIndex =
      currentValue.length <= MAX_STRING_LENGTH
        ? currentValue.length
        : MAX_STRING_LENGTH
    if (currentValue.length >= LIMIT_STRING_LENGTH_WITH_SLASH) {
      currentValue = currentValue
        .substring(0, LIMIT_STRING_LENGTH_FOR_CUT)
        .concat('/')
        .concat(currentValue.substring(LIMIT_STRING_LENGTH_FOR_CUT, limitIndex))
    }
    return currentValue
  }

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!maxLength || event.currentTarget.value.length <= maxLength) {
      let currentValue = event.currentTarget.value
      switch (type) {
        case 'number':
          currentValue = currentValue.replace(/[^\d.-]/g, '')
          break
        case 'date':
          currentValue = tranformValueToValueDate(currentValue)
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
    type: type === 'number' || type === 'date' || !type ? 'text' : type,
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
      {icon && (
        <div className={`icon-container ${iconPosition || 'right'}`}>
          <SvgImport
            icon={icon}
            className={`flex-column flex-center m-l-s icon-16x ${iconStyle}`}
          />
        </div>
      )}
      {!!(bottomDescription && !error) && bottomDescription}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

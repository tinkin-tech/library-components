import * as React from 'react'
import ES_EC from './languages/es_EC'

interface IOption {
  id: string | number
  label: string
}

export interface ISelectComponent {
  options: IOption[]
  valueId: string
  onChangeValue: (id: string | number, valueId: string) => void
  value: string | number
  placeholder?: string
  label?: string
  error?: string
  required?: boolean
  readOnly?: boolean
  labelClassName?: string
  selectClassName?: string
  extraLabelClassName?: string
  extraSelectClassName?: string
}

const SelectComponent: React.FC<ISelectComponent> = (
  props: ISelectComponent
) => {
  const {
    options,
    onChangeValue,
    valueId,
    value,
    placeholder,
    label,
    error,
    required,
    readOnly,
    labelClassName,
    selectClassName,
    extraLabelClassName,
    extraSelectClassName,
  } = props
  const [openSelector, handleOpenSelector] = React.useState(false)
  const selectRef = React.useRef(null)
  const onClickOptionItem = (itemId: string | number): void => {
    handleOpenSelector(false)
    onChangeValue(itemId, valueId)
  }
  const getValue =
    options.find((item) => item.id === value)?.label ||
    placeholder ||
    ES_EC.placeholder
  const handleClickOutside = (event: Event): void => {
    if (!selectRef.current.contains(event.target)) {
      handleOpenSelector(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return (): void => document.removeEventListener('click', handleClickOutside)
  })

  const selectClassNameObject = [
    selectClassName || 'select-component',
    extraSelectClassName || '',
    error ? 'select-component-error' : '',
    readOnly ? 'select-component-disable' : '',
  ].filter((item) => item !== '')

  const labelClassNameObject = [
    labelClassName || 'label',
    extraLabelClassName || '',
    error ? 'warning' : '',
  ].filter((item) => item !== '')

  return (
    <div className={selectClassNameObject.join(' ')} ref={selectRef}>
      {label && (
        <span className={labelClassNameObject.join(' ')}>
          {`${label}${required ? '*' : ''}`}
        </span>
      )}
      <a
        className="select-button"
        onClick={(): void => !readOnly && handleOpenSelector(true)}
      >
        {getValue}
      </a>
      {options.length && openSelector && (
        <ul className="selector-container">
          {options.map((item, index) => (
            <li className="selector-item" key={index}>
              <a
                className={item.id === value ? 'selected' : ''}
                onClick={(): void => onClickOptionItem(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="error-content">{error}</span>}
    </div>
  )
}

export default SelectComponent

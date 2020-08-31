import * as React from 'react'

interface IOption {
  id: string | number
  label: string
}

interface ISelectComponent {
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
    'Seleccione una opción'
  const handleClickOutside = (event: Event): void => {
    if (!selectRef.current.contains(event.target)) {
      handleOpenSelector(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return (): void => document.removeEventListener('click', handleClickOutside)
  })

  return (
    <div className="select-component" ref={selectRef}>
      <a
        className={`${selectClassName || 'select-component'} ${
          extraSelectClassName || ''
        } ${error ? 'select-component-error' : ''} ${
          readOnly ? 'disable-select' : ''
        }`}
        onClick={readOnly ? null : (): void => handleOpenSelector(true)}
      >
        <span
          className={`${labelClassName || 'label'} ${
            extraLabelClassName || ''
          } ${error ? 'label-error' : ''}`}
        >
          {`${label || ''}${required ? '*' : ''}`}&nbsp;
        </span>
        {getValue}
      </a>
      {error && <span>{error}</span>}
      {options.length && openSelector && (
        <ul>
          {options.map((item, index) => (
            <li key={index}>
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
    </div>
  )
}

export default SelectComponent

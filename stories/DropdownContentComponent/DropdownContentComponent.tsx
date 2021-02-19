import * as React from 'react'

interface IOption {
  id: string | number
  label: string
}

export interface IDropdownContentComponent {
  options: IOption[]
  valueId: string
  onChangeValue: (id: string | number, valueId: string) => void
  value: string | number
  placeholder?: string
  label?: string
  required?: boolean
  readOnly?: boolean
  labelClassName?: string
  selectClassName?: string
  extraLabelClassName?: string
  extraSelectClassName?: string
}

export const DropdownContentComponent: React.FC<IDropdownContentComponent> = (
  props: IDropdownContentComponent
) => {
  const {
    options,
    label,
    required,
    readOnly,
    labelClassName,
    selectClassName,
    extraLabelClassName,
    extraSelectClassName,
  } = props
  const [openSelector, handleOpenSelector] = React.useState(false)
  const selectRef = React.useRef(null)
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
    readOnly ? 'select-component-disable' : '',
  ].filter((item) => item !== '')

  const labelClassNameObject = [
    labelClassName || 'label',
    extraLabelClassName || '',
    readOnly ? 'disable' : '',
  ].filter((item) => item !== '')

  return (
    <div className={selectClassNameObject.join(' ')} ref={selectRef}>
      {label && (
        <a
          className={labelClassNameObject.join(' ')}
          onClick={(): void => !readOnly && handleOpenSelector(true)}
        >
          {`${label}${required ? '*' : ''}`}
        </a>
      )}
      <a
        className="select-button"
        onClick={(): void => !readOnly && handleOpenSelector(true)}
      >
        ddddddd
        <i className="icon-arrow-down" />
      </a>
      {!!(options.length && openSelector) && (
        <div className="selector-container">
          ddddddd
        </div>
      )}
    </div>
  )
}

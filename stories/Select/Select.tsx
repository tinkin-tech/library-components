import * as React from 'react'
import { LabelComponent } from '../label/Label'

export interface OptionsInterface {
  id: string
  value: string
}

interface PropsInterface {
  onChange: (option: OptionsInterface) => void
  options: OptionsInterface[]
  displayArrow?: boolean
  className?: string
  valueId?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  search?: boolean
  label?: string
  id: string
  required?: boolean
}

export const SelectComponent = (
  props: PropsInterface
): React.ReactElement<PropsInterface> => {
  const {
    options,
    onChange,
    placeholder,
    valueId,
    className,
    displayArrow,
    disabled,
    error,
    label,
    search,
    id,
    required,
  } = props
  const labels = {
    NO_OPTIONS: 'No hay opciones',
    SELECT: 'select',
  }
  const [expandedOptions, handleExpandedOptions] = React.useState<boolean>(
    false
  )
  const [selectedOption, handleSelectedOption] = React.useState<
    OptionsInterface
  >({
    id: '',
    value: '',
  })
  const [shownOptions, handleShownOptions] = React.useState<OptionsInterface[]>(
    options
  )
  const [inputValue, changeInputValue] = React.useState<string>(
    options.find((option) => option.id === valueId)?.value || ''
  )
  const [focusSelect, changeFocusSelect] = React.useState(false)
  const selectOptions = React.useRef()
  const changeValue = (option: OptionsInterface): void => {
    handleSelectedOption(option)
    handleExpandedOptions(false)
    onChange(option)
    changeInputValue(option.value)
  }
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.currentTarget.value
    const newOptions = options.filter(
      (option) =>
        option.value.includes(newValue) || option.id.includes(newValue)
    )
    handleShownOptions(newOptions)
    handleSelectedOption(null)
    changeInputValue(newValue)
    handleExpandedOptions(true)
  }
  const handleOnClickSelect = (): void => {
    if (!disabled) {
      handleExpandedOptions(!expandedOptions)
    }
    changeFocusSelect(true)
  }

  React.useEffect(() => {
    const eventListener = (event): void => {
      if (event.target !== selectOptions.current && expandedOptions) {
        handleExpandedOptions(false)
        changeFocusSelect(false)
      }
    }
    window.addEventListener('click', eventListener)
    return (): void => window.removeEventListener('click', eventListener)
  }, [expandedOptions])

  return (
    <div
      className={`select-component ${!disabled && 'cursor-pointer'} ${
        disabled ? 'disabled' : ''
      }`}
      onClick={handleOnClickSelect}
      ref={selectOptions}
      data-testid="selectorComponent"
    >
      <div className="flex-space-between">
        <LabelComponent
          label={label}
          disabled={disabled}
          error={!!error}
          required={required}
          referenceId={id}
        />
        {error && <span className="warning-content">&#9888;</span>}
      </div>
      <div className="select-dropdown flex-1">
        <div
          className={
            `flex-row flex-middle border radius-default` +
            ` flex-space-between flex-no-wrap ${
              error
                ? 'border-warning bg-warning bg-lighten-3'
                : expandedOptions
                ? 'border-primary bg-gray bg-lighten-3'
                : 'border-gray border-lighten-1 bg-gray bg-lighten-3'
            } ${focusSelect ? ' bg-gray bg-lighten-4' : ''}`
          }
        >
          <div className="input-container">
            <input
              value={inputValue || selectedOption?.value || ''}
              placeholder={placeholder}
              className={`flex-column p-r ${className || ''} ${
                disabled && 'disabled'
              }`}
              data-testid="selected-option"
              onChange={!disabled ? onSearchChange : null}
              disabled={disabled || !search}
              onClick={(): void => handleExpandedOptions(!shownOptions)}
            />
          </div>
          {displayArrow && (
            <div className="flex-column p-r arrow-dropdown">
              <i className="arrow down icon-arrow" />
            </div>
          )}
        </div>
        <div
          className={`select-options shadow-2 app-scroll ${
            expandedOptions ? 'active' : ''
          } `}
        >
          {shownOptions.length > 0 ? (
            shownOptions.map((option: OptionsInterface) => {
              return (
                <span
                  key={option.id}
                  className="block option cursor-pointer"
                  data-testid={`${className}-${option.id}` || ''}
                  onClick={(): void => changeValue(option)}
                >
                  {option.value}
                </span>
              )
            })
          ) : (
            <span
              className="no-options block option cursor-default text-secondary
                text-lighten-3"
              onClick={(): void => null}
            >
              {labels.NO_OPTIONS}
            </span>
          )}
        </div>
      </div>
      {error && (
        <div
          className="flex-row flex-end size-small strong text-warning
          overflow-wrap"
        >
          <div>{error}</div>
        </div>
      )}
    </div>
  )
}

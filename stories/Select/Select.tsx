import * as React from 'react'

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
  borderStyle?: boolean
  disabled?: boolean
  error?: string
  search?: boolean
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
    borderStyle,
    disabled,
    error,
    search,
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

  React.useEffect(() => {
    const eventListener = (event): void => {
      if (event.target !== selectOptions.current && expandedOptions) {
        handleExpandedOptions(false)
      }
    }
    window.addEventListener('click', eventListener)
    return (): void => window.removeEventListener('click', eventListener)
  }, [valueId, shownOptions])

  return (
    <div
      className={`select-component ${!disabled && 'cursor-pointer'} ${
        disabled && 'disabled'
      }`}
      onClick={(): void => !disabled && handleExpandedOptions(!expandedOptions)}
      ref={selectOptions}
      data-testid="selectorComponent"
    >
      <div className="select-dropdown flex-1">
        <div
          className={`flex-row flex-middle flex-space-between flex-no-wrap ${
            borderStyle ? 'border radius-default bg-white border-padding' : ''
          } ${
            error
              ? 'border-warning'
              : expandedOptions
              ? 'border-primary'
              : 'border-secondary border-lighten-3'
          }`}
        >
          {search ? (
            <div className="input-container">
              <input
                value={inputValue}
                placeholder={placeholder}
                className={`flex-column p-r ${className || ''} ${
                  borderStyle ? '' : 'strong'
                } ${disabled && 'disabled'}`}
                data-testid="selected-option"
                onChange={onSearchChange}
                onClick={(): void => handleExpandedOptions(!shownOptions)}
              />
            </div>
          ) : (
            <div
              className={`flex-column p-r ${className || ''} ${
                borderStyle ? '' : 'strong'
              } ${disabled && 'disabled'}`}
              data-testid="selected-option"
            >
              {selectedOption.value || placeholder || ''}
            </div>
          )}

          {displayArrow && (
            <div className="flex-column p-r">
              <i className="arrow down" />
            </div>
          )}
        </div>
        {!disabled && (
          <div
            className={`select-options app-scroll ${
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
        )}
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

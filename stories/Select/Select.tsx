import * as React from 'react'

export interface Option {
  id: string
  value: string
}

interface Props {
  onChange: (option: Option) => void
  options: Option[]
  displayArrow?: boolean
  className?: string
  valueId?: string
  placeholder?: string
  borderStyle?: boolean
  disable?: boolean
  error?: string
  search?: boolean
}

const SelectComponent = (props: Props): JSX.Element => {
  const {
    options,
    onChange,
    placeholder,
    valueId,
    className,
    displayArrow,
    borderStyle,
    disable,
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

  const [selectedOption, handleSelectedOption] = React.useState<Option>({
    id: '',
    value: '',
  })

  const [shownOptions, handleShownOptions] = React.useState<Option[]>(options)

  const [inputValue, changeInputValue] = React.useState<string>(valueId || '')

  const selectOptions = React.useRef()

  const changeValue = (option: Option): void => {
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
    // eslint-disable-next-line no-restricted-globals
    window.addEventListener('click', eventListener)
    // eslint-disable-next-line no-restricted-globals
    return (): void => window.removeEventListener('click', eventListener)
  })

  return (
    <div
      className={`select-component ${!disable && 'cursor-pointer'} ${
        disable && 'disabled'
      }`}
      onClick={(): void => !disable && handleExpandedOptions(!expandedOptions)}
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
                } ${disable && 'disabled'}`}
                data-testid="selected-option"
                onChange={onSearchChange}
                onClick={(): void => handleExpandedOptions(!shownOptions)}
              />
            </div>
          ) : (
            <div
              className={`flex-column p-r ${className || ''} ${
                borderStyle ? '' : 'strong'
              } ${disable && 'disabled'}`}
              data-testid="selected-option"
            >
              {selectedOption.value || placeholder || ''}
            </div>
          )}

          {displayArrow && (
            <div className="flex-column p-r">
              <span className="arrow down" />
            </div>
          )}
        </div>
        {!disable && (
          <div
            className={`select-options app-scroll ${
              expandedOptions ? 'active' : ''
            } `}
          >
            {shownOptions.length > 0 ? (
              shownOptions.map((option: Option) => {
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
                className="no-options block option cursor-default text-secondary text-lighten-3"
                onClick={(): null => null}
              >
                {labels.NO_OPTIONS}
              </span>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="flex-row flex-end size-small strong text-warning overflow-wrap">
          <div>{error}</div>
        </div>
      )}
    </div>
  )
}

export default React.memo(SelectComponent)

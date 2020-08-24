import * as React from 'react'

export interface IOption {
  id: string;
  value: string;
}

interface IProps {
  onChange: (option: IOption) => void;
  options: IOption[];
  displayArrow?: boolean;
  className?: string;
  valueId?: string;
  placeholder?: string;
  borderStyle?: boolean;
  disable?: boolean;
  error?: string;
  search?: boolean;
}

export const SelectComponent = (props: IProps): React.ReactElement<IProps> => {
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
    search
  } = props;
  
  const labels = {
    NO_OPTIONS: 'No hay opciones',
    SELECT: 'select'
  };

  const [expandedOptions, handleExpandedOptions] = React.useState<boolean>(
    false
  );

  const [selectedOption, handleSelectedOption] = React.useState<IOption>({
    id: '',
    value: ''
  });

  const [shownOptions, handleShownOptions] = React.useState<IOption[]>(options);

  const [inputValue, changeInputValue] = React.useState<string>()

  const selectOptions = React.useRef();

  const changeValue = (option: IOption) => {
    handleSelectedOption(option)
    handleExpandedOptions(false);
    onChange(option);
    changeInputValue(option.value)
  };

  const onSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.currentTarget.value
    const newOptions = options.filter((option) => option.value.includes(newValue) || option.id.includes(newValue))
    handleShownOptions(newOptions)
    handleSelectedOption(null)
    changeInputValue(newValue)
    handleExpandedOptions(true)
  }

  React.useEffect(() => {
    const eventListener = event => {
      if (event.target !== selectOptions.current && expandedOptions) {
        handleExpandedOptions(false);
      }
    };
    window.addEventListener('click', eventListener);
    return () => window.removeEventListener('click', eventListener);
  }, [valueId, shownOptions]);

  return (
    <div
      className={`select-component ${!disable && 'cursor-pointer'} ${disable && 'disabled'}`}
      onClick={() => !disable && handleExpandedOptions(!expandedOptions)}
      ref={selectOptions}
      data-testid="selectorComponent"
    >
      <div className="select-dropdown flex-1">
        <div
          className={`flex-row flex-middle flex-space-between flex-no-wrap ${
            borderStyle
              ? 'border radius-default bg-white border-padding'
              : ''
            } ${
            error
              ? 'border-warning'
              : expandedOptions
                ? 'border-primary'
                : 'border-secondary border-lighten-3'
            }`}
        >
          {
            search ?
              <div className='input-container'>
                <input
                  value={inputValue}
                  placeholder={placeholder}
                  className={`flex-column p-r ${className || ''} ${
                    borderStyle ? '' : 'strong'
                    } ${disable && 'disabled'}`}
                  data-testid="selected-option"
                  onChange={onSearchChange}
                  onClick={() => handleExpandedOptions(!shownOptions)}
                />
              </div>
              :
              <div
                className={`flex-column p-r ${className || ''} ${
                  borderStyle ? '' : 'strong'
                  } ${disable && 'disabled'}`}
                data-testid="selected-option"
              >
                {selectedOption.value || placeholder || ''}
              </div>
          }

          {displayArrow && (
            <div className="flex-column p-r">
              <i className="arrow down"></i>
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
              shownOptions.map((option: IOption) => {
                return (
                  <span
                    key={option.id}
                    className="block option cursor-pointer"
                    data-testid={`${className}-${option.id}` || ''}
                    onClick={() => changeValue(option)}
                  >
                    {option.value}
                  </span>
                );
              })
            ) : (
                <span
                  className="no-options block option cursor-default text-secondary text-lighten-3"
                  onClick={() => null}
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
  );
};

import * as React from 'react'
import { ISelectComponentLabels } from './selectComponentLabels';
import { SvgImport } from './utils/imgUtils';

export interface IOptions {
  id: string;
  value: string;
}

interface IProps {
  onChange: (option: IOptions) => void;
  options: IOptions[];
  displayArrow?: boolean;
  className?: string;
  classNameArrow?: string;
  valueId?: string;
  label?: string;
  placeholder?: string;
  borderStyle?: boolean;
  disable?: boolean;
  error?: string;
}

const SelectComponent = (props: IProps) => {
  const {
    options,
    onChange,
    placeholder,
    valueId,
    className,
    classNameArrow,
    displayArrow,
    borderStyle,
    disable,
    error
  } = props;



  const labels = {
    NO_OPTIONS: 'No hay opciones',
    SELECT: 'select'
  };

  const [expandedOptions, handleExpandedOptions] = React.useState<boolean>(
    false
  );

  const selectOptions = React.useRef();

  const changeValue = (option: IOptions) => {
    handleExpandedOptions(false);
    onChange(option);
  };

  const getValue = (): string => {
    const value: IOptions = options.find(option => option.id === valueId);
    return value ? value.value : '';
  };

  React.useEffect(() => {
    const eventListener = event => {
      if (event.target !== selectOptions.current && expandedOptions) {
        handleExpandedOptions(false);
      }
    };
    window.addEventListener('click', eventListener);
    return () => window.removeEventListener('click', eventListener);
  });

  return (
    <div
      className={`select-component ${!disable &&
        'cursor-pointer'}`}
      onClick={() => !disable && handleExpandedOptions(!expandedOptions)}
      ref={selectOptions}
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
          <div
            className={`flex-column p-r ${className || ''} ${
              borderStyle ? '' : 'strong'
              } ${disable && 'text-secondary text-lighten-2'}`}
          >
            {getValue() || placeholder || ''}
          </div>
          {displayArrow && (
            <div className="flex-column p-r">
              <SvgImport
                icon='../../resources/arrow-full-up.svg'
                className={`arrow-dropdown ${classNameArrow ||
                  ''} ${expandedOptions ? 'active' : ''} ${
                  error
                    ? 'fill-warning'
                    : expandedOptions
                      ? 'fill-primary'
                      : 'fill-secondary fill-lighten-2'
                  }`}
              />
            </div>
          )}
        </div>
        {!disable && (
          <div
            className={`select-options app-scroll ${
              expandedOptions ? 'active' : ''
              } `}
          >
            {options.length > 0 ? (
              options.map((option: IOptions) => {
                return (
                  <span
                    key={option.id}
                    className="block option cursor-pointer"
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


export default React.memo(SelectComponent)

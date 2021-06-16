import * as React from 'react'
import { IAbstractProp } from '../../utils/interface/SharedInterface'

interface IOption {
  id: string | number
  label: string
}

export interface IDropDownContentProps {
  buttonLabel?: string
  dropDownClassName?: string
  extraDropDownClassName?: string
  customButton?: JSX.Element
  dropDownContent: JSX.Element | IOption[]
  dropDownContentLabel?: string
  applyAction?: (
    preselectOptions?: string | number | Array<string | number>
  ) => void
  clearAction?: () => void
  applyLabel?: string
  clearLabel?: string
  closeOnClear?: boolean
  hideClose?: boolean
  closeOnSelect?: boolean
  multipleOptionSelect?: boolean
  onSelectOption?: (
    optionValues: string | number | Array<string | number>
  ) => void
  optionValues?: string | number | Array<string | number>
  optionType?: 'checkbox' | 'radio'
}

export const DropdownContentComponent = (
  props: IDropDownContentProps
): JSX.Element => {
  const {
    buttonLabel,
    dropDownClassName,
    extraDropDownClassName,
    dropDownContent,
    customButton,
    clearAction,
    applyAction,
    applyLabel,
    clearLabel,
    closeOnClear,
    multipleOptionSelect,
    onSelectOption,
    optionValues,
    dropDownContentLabel,
    optionType,
    hideClose,
    closeOnSelect,
  } = props
  const [openDropDown, handleOpenDropDown] = React.useState(false)
  const [preselectOptions, handlePreselectOptions] =
    React.useState<IAbstractProp>(multipleOptionSelect ? [] : null)
  const dropDownRef = React.useRef(null)
  const handleClickOutside = (event: Event): void => {
    if (!dropDownRef.current.contains(event.target)) {
      handleOpenDropDown(false)
    }
  }
  const dropDownClassNameValues = [
    dropDownClassName || 'drop-down-content-component',
    extraDropDownClassName || '',
  ].filter((item) => item !== '')
  const onClickDropDownButton = (): void => {
    if (!openDropDown) {
      const newOptionValues =
        multipleOptionSelect && !optionValues ? [] : optionValues
      handlePreselectOptions(newOptionValues)
    }
    handleOpenDropDown(!openDropDown)
  }
  const onClear = (): void => {
    clearAction()
    handlePreselectOptions(multipleOptionSelect ? [] : null)
    if (closeOnClear) {
      handleOpenDropDown(false)
    }
  }
  const onApply = (): void => {
    applyAction(preselectOptions)
    handleOpenDropDown(false)
  }
  const onSelectOptionHandler = (id: string | number): void => {
    let newValues: IAbstractProp = multipleOptionSelect
      ? [...preselectOptions]
      : preselectOptions
    if (multipleOptionSelect) {
      newValues = newValues.includes(id)
        ? newValues.filter((val: number | string) => val !== id)
        : [...newValues, id]
    } else {
      newValues = newValues === id ? null : id
    }
    if (onSelectOption) {
      onSelectOption(newValues)
    }
    handlePreselectOptions(newValues)
    if (closeOnSelect) {
      handleOpenDropDown(false)
    }
  }
  const isOptions = Array.isArray(dropDownContent)
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return (): void => document.removeEventListener('click', handleClickOutside)
  })
  const activeClass = openDropDown ? 'active' : ''
  return (
    <div className={dropDownClassNameValues.join(' ')} ref={dropDownRef}>
      {customButton ? (
        <div
          className={`custom-button ${activeClass}`}
          onClick={onClickDropDownButton}
        >
          {customButton}
        </div>
      ) : (
        <a
          className={`drop-down-button flex-row flex-middle ${activeClass}`}
          onClick={onClickDropDownButton}
        >
          <span className="flex-1">{buttonLabel}</span>
          <i className="icon-arrow-down" />
        </a>
      )}
      {openDropDown && (
        <div className="drop-down-container">
          {(dropDownContentLabel || !hideClose) && (
            <div className="drop-down-content-label">
              <div className="label-text">{dropDownContentLabel}</div>
              {!hideClose && (
                <div className="close-button">
                  <span
                    className="close-icon"
                    onClick={(): void => handleOpenDropDown(false)}
                  />
                </div>
              )}
            </div>
          )}
          <div className="drop-down-content">
            {isOptions ? (
              <ul className="drop-down-list">
                {(dropDownContent as IOption[]).map((option, key) => {
                  const isActive =
                    (Array.isArray(preselectOptions) &&
                      preselectOptions.includes(option.id)) ||
                    preselectOptions === option.id
                  return (
                    <li
                      className={`drop-down-option ${isActive && 'active'}`}
                      key={key}
                      onClick={(): void => onSelectOptionHandler(option.id)}
                    >
                      <span
                        className={`option-icon ${optionType || 'checkbox'}`}
                      />{' '}
                      {option.label}
                    </li>
                  )
                })}
              </ul>
            ) : (
              dropDownContent
            )}
          </div>
          {!!(applyAction || clearAction) && (
            <div className="action-content">
              {!!clearAction && (
                <div className="clear-area" onClick={onClear}>
                  <a className="clear-button">{clearLabel}</a>
                </div>
              )}
              {!!applyAction && (
                <div className="apply-area" onClick={onApply}>
                  <a className="apply-button">{applyLabel}</a>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

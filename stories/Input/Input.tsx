import * as React from 'react'

export type IInputTypes = 'text' | 'email' | 'number' | 'password'

export type ILabelPositionTypes = 'outside' | 'inside'

interface Label {
  label: string
  labelPosition: ILabelPositionTypes
}

export type InputComponentPropsInterface = {
  id: string
  value: string
  onChangeValue: (id: string, value: string) => void
  type: IInputTypes
  label?: Label
  required?: boolean
  placeholder?: string
  error?: string
  disable?: boolean
}

const Input = (
  props: InputComponentPropsInterface
): React.ReactElement<InputComponentPropsInterface> => {
  const {
    value,
    id,
    onChangeValue,
    type,
    label,
    required,
    error,
    disable,
    placeholder,
  } = props

  const [localValue, changeLocalValue] = React.useState(value)

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = event.currentTarget.value
    changeLocalValue(newValue)
    onChangeValue(id, newValue)
  }

  const onClickInputContent = (): void => {
    // eslint-disable-next-line no-restricted-globals
    document.getElementById(id).focus()
  }

  React.useEffect(() => {
    if (value !== localValue) {
      changeLocalValue(value)
    }
  }, [value])

  const labelElement = label?.label && (
    <label className={`label ${error ? 'label-error' : ''}`} htmlFor={id}>
      {`${label.label}${required ? '*' : ''}`}
    </label>
  )

  return (
    <div id="input-component" className="input-component">
      {label?.labelPosition === 'outside' && labelElement}
      <div
        className={`input-component-content ${
          error ? 'input-component-error' : ''
        }`}
        onClick={onClickInputContent}
      >
        {label?.labelPosition === 'inside' && labelElement}
        {disable ? (
          <div
            className={`disable-text ${
              !value && !placeholder && !label
                ? 'disable-text-without-label'
                : ''
            }`}
          >
            {localValue || placeholder || ''}
          </div>
        ) : (
          <input
            id={id}
            data-testid="input-component"
            value={localValue}
            onChange={onChangeAction}
            type={type}
            placeholder={placeholder}
          />
        )}
        {error && (
          <div className="icon-warning-content">
            <div className="i-warning" />
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default React.memo(Input)

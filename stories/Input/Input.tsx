import * as React from 'react'

type IInputTypes = 'text' | 'email' | 'number' | 'password'

interface InputComponentPropsInterface {
  id: string
  value: string
  onChangeValue: (id: string, value: string) => void
  type: IInputTypes
  label?: string
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

  React.useEffect(() => {
    if (value !== localValue) {
      changeLocalValue(value)
    }
  }, [value])

  return (
    <div className="input-component">
      <div
        className={`input-component-content ${
          error ? 'input-component-error' : ''
        }`}
      >
        {label && (
          <label className={`label ${error ? 'label-error' : ''}`} htmlFor={id}>
            {`${label}${required ? '*' : ''}`}
          </label>
        )}
        <div className="icon-warning" />
        {disable ? (
          <div className="disable-text">{localValue || placeholder || ''}</div>
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
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default React.memo(Input)

import * as React from 'react'
import { LabelComponent } from '../label/Label'

export type IInputTypes = 'text' | 'email' | 'number' | 'password'

export interface InputComponentPropsInterface {
  id: string
  value: string
  onChangeValue: (id: string, value: string | number) => void
  type: IInputTypes
  label?: string
  required?: boolean
  placeholder?: string
  error?: string
  disabled?: boolean
}

export const InputComponent: React.FC<InputComponentPropsInterface> = (
  props: InputComponentPropsInterface
) => {
  const {
    value,
    id,
    onChangeValue,
    type,
    label,
    required,
    error,
    disabled,
    placeholder,
  } = props

  const [valueState, changeValueState] = React.useState(value)

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    changeValueState(event.currentTarget.value)
    onChangeValue(id, event.currentTarget.value)
  }

  React.useEffect(() => {
    if (value !== valueState) {
      changeValueState(value)
    }
  }, [value])

  return (
    <div
      id="input-component"
      className="input-component input p-t p-b flex-column"
    >
      <div className="flex-space-between">
        <LabelComponent
          referenceId={id}
          label={label}
          error={!!error}
          required={required}
          disabled={disabled}
        />
        {error && <span className="icon-warning-content">&#9888;</span>}
      </div>
      <input
        id={id}
        name={id}
        data-testid="input-component"
        value={valueState}
        autoComplete="off"
        spellCheck={false}
        onChange={onChangeAction}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? `warning` : ''}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

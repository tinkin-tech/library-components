import * as React from 'react'

type InputTypes = 'email' | 'number' | 'password'

interface InputComponentPropsInterface {
  value: string
  label: string
  isRequired?: boolean
  error?: string
  placeholder?: string
  id: string
  onChangeValue: () => void
  type?: InputTypes
  isDisable?: boolean
}

const InputComponent = (
  props: InputComponentPropsInterface
): React.ReactElement<InputComponentPropsInterface> => {
  const {
    value,
    label,
    isRequired,
    error,
    placeholder,
  } = props
  return (
    <div>
      <label>{label + isRequired && '*'}</label>
      <input data-testid="input-component" value={value} placeholder={placeholder} onChange={() => null} />
      <span>{error}</span>
    </div>
  )
}

export default React.memo(InputComponent)

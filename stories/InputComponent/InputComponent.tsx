import * as React from 'react'

export type IInputTypes = 'text' | 'email' | 'number' | 'password'

export type ILabelPositionTypes = 'outside' | 'inside'

export type IErrorPositionTypes = 'left' | 'right'

export interface InputComponentPropsInterface {
  /**
   * Id del InputComponent
   */
  id: string
  /**
   * Valor del InputComponent
   */
  value: string
  /**
   * Función que recibe (id, value) cuando se realiza un cambio en la
   * entrada(InputComponent)
   */
  onChangeValue: (id: string, value: string | number) => void
  /**
   * Tipo del InputComponent
   */
  type: IInputTypes
  /**
   * Etiqueta(label) del InputComponent
   */
  label?: string
  /**
   * La posición de la etiqueta(label) del InputComponent
   */
  labelPosition?: ILabelPositionTypes
  /**
   * Se representa con un asterisco si la entrada(InputComponent) es requerido
   */
  required?: boolean
  /**
   * Texto mostrado cuando no hay valor en la entrada(InputComponent)
   */
  placeholder?: string
  /**
   *  Valor que representa un error. Al ingresar un valor un estilo error
   *  se muestra en la entrada, junto al valor que ingrese en la propiedad
   *  error
   */
  error?: string
  /**
   * La posición del error del InputComponent
   */
  errorPosition?: IErrorPositionTypes
  /**
   * Cuando el valor es verdadero, muestra un estilo opaco en el
   * componente y el valor no se puede ingresar en la entrada.
   */
  disable?: boolean
}

type errorsLocalTypes = 'ONLY_NUMBERS' | 'FORMAT_EMAIL'

type errorsLocalEnumsTypes = {
  [name in errorsLocalTypes]: {
    key: errorsLocalTypes
    label: string
  }
}

const ERRORS_LOCAL_ENUMS: errorsLocalEnumsTypes = {
  ONLY_NUMBERS: {
    key: 'ONLY_NUMBERS',
    label: 'Ingrese solo números y [-, .]',
  },
  FORMAT_EMAIL: {
    key: 'FORMAT_EMAIL',
    label: 'Ingrese un formato válido de correo',
  },
}

/**
 * Componente UI para interacción
 */
export const InputComponent: React.FC<InputComponentPropsInterface> = (
  props: InputComponentPropsInterface
) => {
  const {
    value,
    id,
    onChangeValue,
    type,
    label,
    labelPosition,
    required,
    error,
    disable,
    placeholder,
    errorPosition,
  } = props

  const [localError, changeLocalError] = React.useState('')

  const filterValueForType = (value: string | number): string | number => {
    const valueString = value.toString()
    switch (type) {
      case 'number': {
        const reg = new RegExp(/[^\d.-]/g)
        value &&
          changeLocalError(
            valueString.split('').some((element) => reg.test(element))
              ? ERRORS_LOCAL_ENUMS.ONLY_NUMBERS.label
              : ''
          )
        return value ? value.toString().replace(reg, '') : ''
      }
      case 'email': {
        const reg = new RegExp(/^[a-zA-Z0-9_.\-]+@[a-z]+\.[a-z]+$/)
        value &&
          changeLocalError(
            reg.test(valueString) ? '' : ERRORS_LOCAL_ENUMS.FORMAT_EMAIL.label
          )
        return value
      }
      default: {
        return value
      }
    }
  }

  const [localValue, changeLocalValue] = React.useState(
    filterValueForType(value)
  )

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = event.currentTarget.value
    changeLocalValue(filterValueForType(newValue))
    onChangeValue(id, filterValueForType(newValue))
  }

  const onClickInputContent = (): void => {
    if (!disable) {
      // eslint-disable-next-line no-restricted-globals
      document.getElementById(id).focus()
    }
  }

  React.useEffect(() => {
    if (value !== localValue) {
      changeLocalValue(filterValueForType(value))
    }
  }, [value])

  const labelElement = label && (
    <label
      className={`label ${error || localError ? 'label-error' : ''}`}
      htmlFor={id}
    >
      {`${label}${required ? '*' : ''}`}
    </label>
  )

  return (
    <div
      id="input-component"
      className={`input-component input flex-column ${
        disable ? 'disable-component' : ''
      }`}
    >
      <label htmlFor={id}>{label && labelElement}</label>
      {label && labelPosition === 'inside' && labelElement}
      <input
        id={id}
        name={id}
        data-testid="input-component"
        value={localValue}
        autoComplete="off"
        spellCheck={false}
        onChange={onChangeAction}
        type={type !== 'number' ? type : 'text'}
        placeholder={placeholder}
        disabled={disable}
        className={error || localError ? `warning` : ''}
      />
      {(error || localError) && (
        <div className="icon-warning-content">
          <div className="i-warning" />
        </div>
      )}
      {(error || localError) && (
        <div
          className={`error-message ${
            errorPosition === 'right' ? 'error-position-right' : ''
          }`}
        >
          {error || localError}
        </div>
      )}
    </div>
  )
}

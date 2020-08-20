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
  onChangeValue: (id: string, value: string) => void
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

  const [localValue, changeLocalValue] = React.useState(value)

  const onChangeAction = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newValue = event.currentTarget.value
    changeLocalValue(newValue)
    onChangeValue(id, newValue)
  }

  const onClickInputContent = (): void => {
    if (!disable) {
      // eslint-disable-next-line no-restricted-globals
      document.getElementById(id).focus()
    }
  }

  React.useEffect(() => {
    if (value !== localValue) {
      changeLocalValue(value)
    }
  }, [value])

  const labelElement = label && (
    <label className={`label ${error ? 'label-error' : ''}`} htmlFor={id}>
      {`${label}${required ? '*' : ''}`}
    </label>
  )

  return (
    <div
      id="input-component"
      className={`input-component ${disable ? 'disable-component' : ''}`}
    >
      {label && labelPosition === 'outside' && labelElement}
      <div
        className={`input-component-content ${
          error ? 'input-component-error' : ''
        }`}
        onClick={onClickInputContent}
      >
        {label && labelPosition === 'inside' && labelElement}
        {disable ? (
          <div
            className={`disable-text ${
              !value && !localValue && !placeholder
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
      {error && errorPosition && (
        <div
          className={`error-message ${
            errorPosition === 'right' ? 'error-position-right' : ''
          }`}
        >
          {error}
        </div>
      )}
    </div>
  )
}

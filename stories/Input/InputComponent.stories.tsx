import * as React from 'react'
import { action } from '@storybook/addon-actions'

import InputComponent, { InputComponentPropsInterface } from './InputComponent'

export default {
  title: 'Input',
  component: InputComponent,
}

const Template = (arg: InputComponentPropsInterface): JSX.Element => (
  <InputComponent {...arg} />
)

export const Default: { args: InputComponentPropsInterface } = Template.bind({})

export const Error: { args: InputComponentPropsInterface } = Template.bind({})

export const Disable: { args: InputComponentPropsInterface } = Template.bind({})

Default.args = {
  /**
   * Id del InputComponent
   */
  valueId: 'input',
  /**
   * Valor del InputComponent
   */
  value: '',
  /**
   * Función que recibe (id, value) cuando se realiza un cambio en la
   * entrada(InputComponent)
   */
  onChangeValue: action('OnChangeValue'),
  /**
   * Tipo del InputComponent
   */
  type: 'text',
  /**
   * Se representa con un asterisco si la entrada(InputComponent) es requerido
   */
  required: false,
  /**
   * Texto mostrado cuando no hay valor en la entrada(InputComponent)
   */
  placeholder: '',
  /**
   *  Valor que representa un error. Al ingresar un valor un estilo error
   *  se muestra en la entrada, junto al valor que ingrese en la propiedad
   *  error
   */
  error: '',
}

Disable.args = {
  valueId: '',
  type: 'text',
  onChangeValue: action('onChangeValue'),
  value: '',
  error: '',
  label: 'Input',
  readOnly: true,
  required: true,
  placeholder: '',
  inputClassName: '',
  labelClassName: '',
}

Error.args = {
  valueId: '',
  type: 'text',
  onChangeValue: action('onChangeValue'),
  value: '',
  error: 'Error input default text',
  label: 'Input',
  readOnly: false,
  required: true,
  placeholder: '',
  inputClassName: '',
  labelClassName: '',
}

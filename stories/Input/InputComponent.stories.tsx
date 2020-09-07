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

export const Default = Template.bind({})

Default.args = {
  /**
   * Id del InputComponent
   */
  id: 'input',
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

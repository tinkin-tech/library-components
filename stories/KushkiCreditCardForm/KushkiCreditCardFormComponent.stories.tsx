import * as React from 'react'
import { Story } from '@storybook/react'

import {
  IKushkiCreditCardFormComponent,
  KushkiCreditCardFormComponent,
} from './KushkiCreditCardFormComponent'
import { action } from '@storybook/addon-actions'

const Template: Story<IKushkiCreditCardFormComponent> = (args) => (
  <KushkiCreditCardFormComponent {...args} />
)

export const Default = Template.bind({})

Default.args = {
  onSubmit: action('onSubmit'),
  inputErrors: {},
  checkboxErrorMessage: 'Debe aceptar las condiciones de uso',
  formError: '',
  changeInputErrors: action('changeInputErrors'),
  buttonText: 'Confirmar Pago',
  checkboxLabelComponent: <span>Acepto los terminos</span>,
  maxWidth: '400px',
}

export default {
  title: 'Formulario para Kushki',
  component: KushkiCreditCardFormComponent,
}

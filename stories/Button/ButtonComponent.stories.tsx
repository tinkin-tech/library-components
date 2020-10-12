import * as React from 'react'

import { IButtonComponent, ButtonComponent } from './ButtonComponent'

export default {
  title: 'Button',
  component: ButtonComponent,
}

const Template = (arg: IButtonComponent): JSX.Element => (
  <ButtonComponent {...arg} />
)

export const Default: { args: IButtonComponent } = Template.bind({})

Default.args = {
  buttonText: 'Buton Content',
}

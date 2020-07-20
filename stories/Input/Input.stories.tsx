import * as React from 'react'
import InputComponent from './InputComponent'

export default {
  title: 'Input',
  component: InputComponent,
}

export const WithValue = (): React.ReactNode => {
  return (
    <InputComponent
      value="oeu"
      label="label"
      onChangeValue={(): null => null}
      id="input"
    />
  )
}

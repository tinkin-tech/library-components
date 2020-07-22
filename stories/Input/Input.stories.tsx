import * as React from 'react'
import InputComponent from './Input'

export default {
  title: 'Input',
  component: InputComponent,
}

const styleInputContent = { width: '350px' }

export const WithOutLabel = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value=""
        onChangeValue={(): null => null}
        type="text"
      />
    </div>
  )
}

export const Value = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value="Text"
        onChangeValue={(): null => null}
        type="text"
        label="Label"
      />
    </div>
  )
}

export const Placeholder = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value=""
        onChangeValue={(): null => null}
        type="text"
        label="Label"
        placeholder="placeholder"
      />
    </div>
  )
}

export const Required = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value="Text"
        onChangeValue={(): null => null}
        type="text"
        label="Label"
        required={true}
      />
    </div>
  )
}

export const Disable = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value="Text"
        onChangeValue={(): null => null}
        type="text"
        label="Label"
        required={true}
        disable={true}
      />
    </div>
  )
}

export const Error = (): React.ReactNode => {
  return (
    <div style={styleInputContent}>
      <InputComponent
        id="input"
        data-testid="input-component"
        value="Text"
        onChangeValue={(): null => null}
        type="text"
        label="Label"
        required={true}
        error="El campo no puede ser vacío"
      />
    </div>
  )
}

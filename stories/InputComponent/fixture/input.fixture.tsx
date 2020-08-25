import * as React from 'react'
import { InputComponent } from '../Input'

export const inputDefault: JSX.Element = (
  <InputComponent
    id="input"
    value="value"
    placeholder="placeholder"
    onChangeValue={(): null => null}
    type="text"
    label="Label"
    required={true}
    error=""
    disabled={false}
  />
)

export const inputTypeText: JSX.Element = (
  <InputComponent
    id="input"
    value=""
    onChangeValue={(): null => null}
    type="text"
  />
)

export const InputTypeTextWithValue: React.ReactElement = (
  <InputComponent
    id="input"
    value="Hello World!!"
    onChangeValue={(): null => null}
    type="text"
  />
)

export const inputTypeNumber: JSX.Element = (
  <InputComponent
    id="input"
    value=""
    onChangeValue={(): null => null}
    type="number"
  />
)

export const InputWithError: React.ReactElement = (
  <InputComponent
    id="input"
    value="Hello World!!"
    onChangeValue={null}
    type="text"
    error="Error de prueba"
  />
)

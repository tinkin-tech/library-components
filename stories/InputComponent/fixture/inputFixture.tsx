import * as React from 'react'

import { InputComponent } from '../InputComponent'

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
    disable={false}
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

export const inputTypeNumber: JSX.Element = (
  <InputComponent
    id="input"
    value=""
    onChangeValue={(): null => null}
    type="number"
  />
)

import * as React from 'react'

import InputComponent from '../Input'

export const inputTypeText: JSX.Element = (
  <InputComponent
    id="input"
    data-testid="input"
    value=""
    onChangeValue={(): null => null}
    type="text"
    label="Label text"
  />
)

export const inputTypeNumber: JSX.Element = (
  <InputComponent
    id="input"
    data-testid="input"
    value=""
    onChangeValue={(): null => null}
    type="number"
    label="Label number"
  />
)

export const inputTypePassword: JSX.Element = (
  <InputComponent
    id="input"
    data-testid="input"
    value=""
    onChangeValue={(): null => null}
    type="password"
    label="Label password"
  />
)

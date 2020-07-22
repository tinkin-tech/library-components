import * as React from 'react'

import InputComponent from '../Input'

export const inputDefault = (
  <InputComponent
    id="input"
    data-testid="input-component"
    value="text"
    onChangeValue={(): null => null}
    type="text"
    label="Label"
  />
)

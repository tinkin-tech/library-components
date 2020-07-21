import * as React from 'react'
import InputComponent from './InputComponent'
import * as renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('InputComponent test', () => {
  it('Should take the snapshot with require props', () => {
    const component = renderer.create(
      <InputComponent
        value="Texto"
        label="InputPrueba"
        onChangeValue={(): null => null}
        id="input"
      />
    )
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })

  it('Should render input in virtual DOM', () => {
    const { getByTestId } = render(
      <InputComponent
        value="Texto"
        label="InputPrueba"
        onChangeValue={(): null => null}
        id="input"
      />
    )
    expect(getByTestId('input-component')).toBeInTheDocument()
  })
})

import * as renderer from 'react-test-renderer'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {
  inputTypeText,
  inputTypeNumber,
  inputDefault,
  InputTypeTextWithValue,
  InputWithError,
} from './fixture/input.fixture'

describe('InputComponent test', () => {
  it('Should take the snapshot with require props', () => {
    const input = renderer.create(inputDefault)
    const inputComponentJSON = input.toJSON()
    expect(inputComponentJSON).toMatchSnapshot()
  })

  it('Should render input in virtual DOM', () => {
    const { getByTestId } = render(inputTypeText)
    expect(getByTestId('input-component')).toBeInTheDocument()
  })

  it('Should be able to enter a value, when type is text', () => {
    const dom = render(inputTypeText)
    const input = getByTestId(dom.container, 'input-component')
    fireEvent.change(input, { target: { value: 'Hello World!' } })
    expect(input.getAttribute('value')).toBe('Hello World!')
  })

  it('The value should be empty when I enter text and type is number', () => {
    const dom = render(inputTypeNumber)
    const input = getByTestId(dom.container, 'input-component')
    fireEvent.change(input, { target: { value: 'Hello World!' } })
    expect(input.getAttribute('value')).toBe('')
  })

  it('Should pass value different from valueState of input component', () => {
    const { getByTestId, rerender } = render(inputTypeText)
    expect(getByTestId('input-component')).toMatchObject({ value: '' })
    rerender(InputTypeTextWithValue)
    expect(getByTestId('input-component')).toMatchObject({
      value: InputTypeTextWithValue.props.value,
    })
  })

  it('Should add className label-error when component pass with error', () => {
    const { getByTestId, rerender } = render(inputTypeText)
    expect(getByTestId('label-component').className).not.toContain(
      'label-error'
    )
    rerender(InputWithError)
    expect(getByTestId('label-component').className).toContain('label-error')
  })
})

import * as renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {
  inputTypeText,
  inputTypeNumber,
  inputTypePassword,
} from './fixture/inputFixture'

describe('InputComponent test', () => {
  it('Should take the snapshot with require props', () => {
    const input = renderer.create(inputTypeText)
    const inputComponentJSON = input.toJSON()
    expect(inputComponentJSON).toMatchSnapshot()
  })

  it('Should render input in virtual DOM', () => {
    const { getByTestId } = render(inputTypeText)
    expect(getByTestId('input-component')).toBeInTheDocument()
  })

  it('Should be able to enter a value, when type is text', () => {
    const setup = (): { input: HTMLElement } => {
      const utils = render(inputTypeText)
      const input = utils.getByLabelText('Label text')
      return {
        input,
        ...utils,
      }
    }
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'Hello World!' } })
    expect(input.getAttribute('value')).toBe('Hello World!')
  })

  it('The value should be empty when I enter text and type is number', () => {
    const setup = (): { input: HTMLElement } => {
      const utils = render(inputTypeNumber)
      const input = utils.getByLabelText('Label number')
      return {
        input,
        ...utils,
      }
    }
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'Hello World!' } })
    expect(input.getAttribute('value')).toBe('')
  })

  it('The value should be points when I enter text and type password', () => {
    const setup = (): { input: HTMLElement } => {
      const utils = render(inputTypePassword)
      const input = utils.getByLabelText('Label password')
      return {
        input,
        ...utils,
      }
    }
    const { input } = setup()
    fireEvent.change(input, { target: { value: 'Hello World!' } })
    expect(input.getAttribute('value')).toBe('Hello World!')
  })
})

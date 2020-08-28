import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ButtonComponent from './ButtonComponent'
import '@testing-library/jest-dom/extend-expect'

describe('render component <ButtonComponent />', () => {
  it('should recive buttonText prop, and show inside button', () => {
    const { container } = render(<ButtonComponent buttonText="button" />)
    expect(container.querySelector('button')).toHaveAttribute('value', 'button')
  })

  it('should recive onClick property', () => {
    const fun = jest.fn()
    const { container } = render(
      <ButtonComponent buttonText="button" onClick={fun} />
    )
    fireEvent.click(container.querySelector('button'))
    expect(fun).toHaveBeenCalledTimes(1)
  })

  it('should recive disable property, functional disable', () => {
    const fun = jest.fn()
    const { container } = render(
      <ButtonComponent buttonText="button" onClick={fun} disable={true} />
    )
    fireEvent.click(container.querySelector('button'))
    expect(fun).toHaveBeenCalledTimes(0)
  })

  it("should recive visualDisable property and set className 'disable', visual disable", () => {
    const fun = jest.fn()
    const { container } = render(
      <ButtonComponent buttonText="button" onClick={fun} visualDisable={true} />
    )
    expect(container.getElementsByClassName('disable')[0]).toBeInTheDocument()
    fireEvent.click(container.querySelector('button'))
    expect(fun).toHaveBeenCalledTimes(1)
  })

  it('should recive buttonType property and set className', () => {
    const fun = jest.fn()
    const { container } = render(
      <ButtonComponent
        buttonText="button"
        onClick={fun}
        buttonType={'success'}
      />
    )
    expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    fireEvent.click(container.querySelector('button'))
    expect(fun).toHaveBeenCalledTimes(1)
  })
})

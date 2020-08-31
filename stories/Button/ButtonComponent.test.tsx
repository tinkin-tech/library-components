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
    const { container } = render(
      <ButtonComponent buttonText="button" buttonType={'success'} />
    )
    expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
  })

  it('should recive smallButton property and set className', () => {
    const { container } = render(
      <ButtonComponent
        buttonText="button"
        smallButton={true}
        buttonType={'success'}
      />
    )
    expect(container.getElementsByClassName('btn-small')[0]).toBeInTheDocument()
    expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
  })

  it('should recive buttonClass property and set className, overrides smallButton and buttonType', () => {
    const { container } = render(
      <ButtonComponent
        buttonText="button"
        smallButton={true}
        buttonType={'success'}
        buttonClass={'button-class'}
      />
    )
    expect(container.getElementsByClassName('btn-small')).toHaveLength(0)
    expect(container.getElementsByClassName('success')).toHaveLength(0)
    expect(
      container.getElementsByClassName('button-class')[0]
    ).toBeInTheDocument()
  })

  it('should recive extraButtonClass property and set className, added to smallButton and buttonType', () => {
    const { container } = render(
      <ButtonComponent
        buttonText="button"
        smallButton={true}
        buttonType={'success'}
        extraButtonClass={'extra-class'}
      />
    )
    expect(container.getElementsByClassName('btn-small')[0]).toBeInTheDocument()
    expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    expect(
      container.getElementsByClassName('extra-class')[0]
    ).toBeInTheDocument()
  })

  it('should recive formButton property, true - a', () => {
    const { container } = render(
      <ButtonComponent buttonText="button" formButton={true} />
    )
    expect(container.querySelector('a')).toBeInTheDocument()
  })

  it('should recive formButton property, false - button', () => {
    const { container } = render(
      <ButtonComponent buttonText="button" formButton={false} />
    )
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})

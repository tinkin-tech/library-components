import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ButtonComponent from './ButtonComponent'
import '@testing-library/jest-dom/extend-expect'

describe('render component <ButtonComponent />', () => {
  describe('buttonText property', () => {
    it('should recive buttonText prop, and show inside button - a tag', () => {
      const { container } = render(<ButtonComponent buttonText="button text" />)
      expect(container.firstElementChild.innerHTML).toBe('button text')
    })

    it('should recive buttonText prop, and show inside button - button tag', () => {
      const { container } = render(
        <ButtonComponent buttonText="button text" formButton={true} />
      )
      expect(container.firstElementChild.innerHTML).toBe('button text')
    })
  })

  describe('onClick property', () => {
    it('should recive onClick property', () => {
      const fun = jest.fn()
      const { container } = render(
        <ButtonComponent buttonText="button" onClick={fun} />
      )
      fireEvent.click(container.querySelector('a'))
      expect(fun).toHaveBeenCalledTimes(1)
    })
  })

  describe('disabled property', () => {
    it("should recive disabled property and set className 'disabled', functional disable", () => {
      const fun = jest.fn()
      const { container } = render(
        <ButtonComponent buttonText="button" onClick={fun} disabled={true} />
      )
      fireEvent.click(container.querySelector('a'))
      expect(fun).toHaveBeenCalledTimes(0)
      expect(
        container.getElementsByClassName('disabled')[0]
      ).toBeInTheDocument()
    })
  })

  describe('visualDisabled property', () => {
    it("should recive visualDisabled property and set className 'disabled', visual disable", () => {
      const fun = jest.fn()
      const { container } = render(
        <ButtonComponent
          buttonText="button"
          onClick={fun}
          visualDisabled={true}
        />
      )
      expect(
        container.getElementsByClassName('disabled')[0]
      ).toBeInTheDocument()
      fireEvent.click(container.querySelector('a'))
      expect(fun).toHaveBeenCalledTimes(1)
    })
  })

  describe('buttonType property', () => {
    it('should recive buttonType property and set className', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" buttonType={'success'} />
      )
      expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    })

    it('should set className when not reciving buttonType', () => {
      const { container } = render(<ButtonComponent buttonText="button" />)
      expect(container.getElementsByClassName('primary')[0]).toBeInTheDocument()
    })
  })

  describe('smallButton property', () => {
    it('should recive smallButton property and set className', () => {
      const { container } = render(
        <ButtonComponent
          buttonText="button"
          smallButton={true}
          buttonType={'success'}
        />
      )
      expect(
        container.getElementsByClassName('btn-small')[0]
      ).toBeInTheDocument()
      expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    })
  })

  describe('buttonClass property', () => {
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
  })

  describe('extraButtonClass property', () => {
    it('should recive extraButtonClass property and set className, added to smallButton and buttonType', () => {
      const { container } = render(
        <ButtonComponent
          buttonText="button"
          smallButton={true}
          buttonType={'success'}
          extraButtonClass={'extra-class'}
        />
      )
      expect(
        container.getElementsByClassName('btn-small')[0]
      ).toBeInTheDocument()
      expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
      expect(
        container.getElementsByClassName('extra-class')[0]
      ).toBeInTheDocument()
    })
  })

  describe('formButton property', () => {
    it('should recive formButton property, true - button', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" formButton={true} />
      )
      expect(container.querySelector('button')).toBeInTheDocument()
    })

    it('should recive formButton property, false - a', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" formButton={false} />
      )
      expect(container.querySelector('a')).toBeInTheDocument()
    })
  })
})

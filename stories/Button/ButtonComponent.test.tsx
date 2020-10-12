import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { ButtonComponent } from './ButtonComponent'

describe('render component <ButtonComponent />', () => {
  describe('when reciving buttonText property', () => {
    it('should render text inside button - a tag', () => {
      const { container } = render(<ButtonComponent buttonText="button text" />)
      expect(container.firstElementChild.innerHTML).toBe('button text')
    })

    it('should render text inside button - button tag', () => {
      const { container } = render(
        <ButtonComponent buttonText="button text" formButton={true} />
      )
      expect(container.firstElementChild.innerHTML).toBe('button text')
    })
  })

  describe('when reciving onClick property', () => {
    it('should execute onClick function when button is clicked', () => {
      const fun = jest.fn()
      const { container } = render(
        <ButtonComponent buttonText="button" onClick={fun} />
      )
      fireEvent.click(container.querySelector('a'))
      expect(fun).toHaveBeenCalledTimes(1)
    })
  })

  describe('when reciving disabled property', () => {
    it(
      'should set className disabled and onClick shouldnt work, functional ' +
        ' disable',
      () => {
        const fun = jest.fn()
        const { queryByText, container } = render(
          <ButtonComponent buttonText="button" onClick={fun} disabled={true} />
        )
        fireEvent.click(container.querySelector('a'))
        expect(fun).toHaveBeenCalledTimes(0)
        expect(queryByText('button').className).toContain('button-disable')
      }
    )
  })

  describe('when reciving visualDisabled property', () => {
    it(
      'should set className disabled and onClick should work, visual ' +
        'disable',
      () => {
        const fun = jest.fn()
        const { container, queryByText } = render(
          <ButtonComponent
            buttonText="button"
            onClick={fun}
            visualDisabled={true}
          />
        )
        expect(queryByText('button').className).toContain(
          'button-visual-disable'
        )
        fireEvent.click(container.querySelector('a'))
        expect(fun).toHaveBeenCalledTimes(1)
      }
    )
  })

  describe('when reciving buttonType property', () => {
    it('should set buttonType as className', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" buttonType={'success'} />
      )
      expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    })

    it('should set className "primary" when not reciving buttonType', () => {
      const { container } = render(<ButtonComponent buttonText="button" />)
      expect(container.getElementsByClassName('primary')[0]).toBeInTheDocument()
    })
  })

  describe('when reciving smallButton property', () => {
    it('should set className "button-small" when true', () => {
      const { container } = render(
        <ButtonComponent
          buttonText="button"
          smallButton={true}
          buttonType={'success'}
        />
      )
      expect(
        container.getElementsByClassName('button-small')[0]
      ).toBeInTheDocument()
      expect(container.getElementsByClassName('success')[0]).toBeInTheDocument()
    })
  })

  describe('when reciving buttonClass property', () => {
    it(
      'should set butonClass className, overrides smallButton and ' +
        'buttonType',
      () => {
        const { container } = render(
          <ButtonComponent
            buttonText="button"
            smallButton={true}
            buttonType={'success'}
            buttonClass={'button-class'}
          />
        )
        expect(container.getElementsByClassName('button-small')).toHaveLength(0)
        expect(container.getElementsByClassName('success')).toHaveLength(0)
        expect(
          container.getElementsByClassName('button-class')[0]
        ).toBeInTheDocument()
      }
    )
  })

  describe('when reciving extraButtonClass property', () => {
    it(
      'should set extraButtonClass className added to smallButton and ' +
        'buttonType',
      () => {
        const { container, queryByText } = render(
          <ButtonComponent
            buttonText="button"
            smallButton={true}
            buttonType={'success'}
            extraButtonClass={'extra-class'}
          />
        )
        expect(queryByText('button').className).toContain('button-small')
        expect(
          container.getElementsByClassName('success')[0]
        ).toBeInTheDocument()
        expect(
          container.getElementsByClassName('extra-class')[0]
        ).toBeInTheDocument()
      }
    )
  })

  describe('when reciving formButton property', () => {
    it('should render with button tag if true', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" formButton={true} />
      )
      expect(container.querySelector('button')).toBeInTheDocument()
    })

    it('should render with a tag if false', () => {
      const { container } = render(
        <ButtonComponent buttonText="button" formButton={false} />
      )
      expect(container.querySelector('a')).toBeInTheDocument()
    })
  })
})

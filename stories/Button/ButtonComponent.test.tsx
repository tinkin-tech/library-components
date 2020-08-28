import * as React from 'react'
import { render } from '@testing-library/react'
import ButtonComponent from './ButtonComponent'
import '@testing-library/jest-dom/extend-expect'

describe('render component <ButtonComponent />', () => {
  it('should recive buttonText prop, and show inside button', () => {
    const { container } = render(<ButtonComponent buttonText="button" />)
    expect(container.querySelector('button')).toHaveAttribute('value', 'button')
  })
})

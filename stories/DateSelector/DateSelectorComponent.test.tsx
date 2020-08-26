import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DateSelectorComponent from './DateSelectorComponent'
import '@testing-library/jest-dom/extend-expect'

describe('render component <DateSelectorComponent />', () => {
  describe('shold select year month and day', () => {
    it('should render DateSelectorComponent and select year', () => {
      const { getByText } = render(<DateSelectorComponent />)
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2021'))
      expect(getByText('2021')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select month', () => {
      const { getByText } = render(<DateSelectorComponent />)
      fireEvent.click(getByText('Mes'))
      fireEvent.click(getByText('05'))
      expect(getByText('05')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select day', () => {
      const { getByText } = render(<DateSelectorComponent />)
      fireEvent.click(getByText('Día'))
      fireEvent.click(getByText('26'))
      expect(getByText('26')).toBeInTheDocument()
    })
  })
})

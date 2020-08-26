import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DateSelectorComponent from './DateSelectorComponent'
import '@testing-library/jest-dom/extend-expect'

describe('render component <DateSelectorComponent />', () => {
  describe('should select year, month and day', () => {
    it('should render DateSelectorComponent and select year', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2021'))
      expect(getByText('2021')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select month', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Mes'))
      fireEvent.click(getByText('05'))
      expect(getByText('05')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select day', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Día'))
      fireEvent.click(getByText('26'))
      expect(getByText('26')).toBeInTheDocument()
    })
  })

  describe('should recive date format property', () => {
    it('should render DateSelectorComponent with dateFormat YYYY-MM-DD', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      expect(getByText('Año')).toBeInTheDocument()
      expect(getByText('Mes')).toBeInTheDocument()
      expect(getByText('Día')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent with dateFormat YYYY-MM', () => {
      const { getByText, queryByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM" />
      )
      expect(getByText('Año')).toBeInTheDocument()
      expect(getByText('Mes')).toBeInTheDocument()
      expect(queryByText('Día')).toBeNull()
    })

    it('should render DateSelectorComponent with dateFormat MM-DD', () => {
      const { getByText, queryByText } = render(
        <DateSelectorComponent dateFormat="MM-DD" />
      )
      expect(getByText('Mes')).toBeInTheDocument()
      expect(getByText('Día')).toBeInTheDocument()
      expect(queryByText('Año')).toBeNull()
    })
  })
})

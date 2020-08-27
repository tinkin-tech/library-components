import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DateSelectorComponent from './DateSelectorComponent'
import '@testing-library/jest-dom/extend-expect'
import DateUtils from '../../utils/dateUtils'

describe('render component <DateSelectorComponent />', () => {
  const currentDate = DateUtils.formatDate(new Date(), null, 'YYYY-MM-DD')
  const minDate = DateUtils.substractDate(currentDate, 'YYYY-MM-DD', 2, 'years')
  const minDateObject = DateUtils.dateStringToObject(minDate, 'YYYY-MM-DD')

  describe('should select year, month and day', () => {
    it('should render DateSelectorComponent and select year', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText(minDateObject.year))
      expect(getByText(minDateObject.year)).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select month', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Mes'))
      fireEvent.click(getByText(minDateObject.month))
      expect(getByText(minDateObject.month)).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select day', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText(minDateObject.year))
      fireEvent.click(getByText('Mes'))
      fireEvent.click(getByText(minDateObject.month))
      fireEvent.click(getByText('Día'))
      fireEvent.click(getByText(minDateObject.day))
      expect(getByText(minDateObject.day)).toBeInTheDocument()
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

  describe('should recive minDate property', () => {
    it(
      'shouldnt show lower dates than minDate,' + 'dateFormat YYYY - MM - DD',
      () => {
        const { getByText, container } = render(
          <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2019-03-02" />
        )
        fireEvent.click(getByText('Año'))
        expect(container.querySelectorAll('li')[0].innerHTML).toContain('2019')
        fireEvent.click(getByText('2019'))
        fireEvent.click(getByText('Mes'))
        expect(container.querySelectorAll('li')[0].innerHTML).toContain('03')
        fireEvent.click(getByText('03'))
        fireEvent.click(getByText('Día'))
        expect(container.querySelectorAll('li')[0].innerHTML).toContain('02')
      }
    )

    it('shoud set min date when its not provided', () => {
      const { getByText, container } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.year
      )
      fireEvent.click(getByText(minDateObject.year))
      fireEvent.click(getByText('Mes'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.month
      )
      fireEvent.click(getByText(minDateObject.month))
      fireEvent.click(getByText('Día'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.day
      )
    })
  })
})

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DateSelectorComponent from './DateSelectorComponent'
import '@testing-library/jest-dom/extend-expect'
import DateUtils from '../../utils/dateUtils'

describe('render component <DateSelectorComponent />', () => {
  const dateFormat = 'YYYY-MM-DD'
  const currentDate = DateUtils.formatDate(new Date(), null, dateFormat)
  const minDate = DateUtils.substractDate(currentDate, dateFormat, 2, 'years')
  const minDateObject = DateUtils.dateStringToObject(minDate, dateFormat)
  const maxDate = DateUtils.addDate(currentDate, dateFormat, 2, 'years')
  const maxDateObject = DateUtils.dateStringToObject(maxDate, dateFormat)

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
      const { getByText, getAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText((parseInt(minDateObject.year) + 1).toString()))
      fireEvent.click(getAllByText('01')[0])
      fireEvent.click(getByText('12'))
      fireEvent.click(getByText('01'))
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
    it('should select lowest available date, this should be minDate', () => {
      const { getByText, container, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2019-03-02" />
      )
      fireEvent.click(getByText('Año'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('2019')
      fireEvent.click(getByText('2019'))
      fireEvent.click(getByText('03'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('03')
      fireEvent.click(queryAllByText('03')[1])
      fireEvent.click(getByText('02'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('02')
    })

    it('should set min date when its not provided', () => {
      const { getByText, container, getAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" />
      )
      fireEvent.click(getByText('Año'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.year
      )
      fireEvent.click(getByText(minDateObject.year))
      fireEvent.click(getByText(minDateObject.month))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.month
      )
      fireEvent.click(getAllByText(minDateObject.month)[1])
      fireEvent.click(getByText(minDateObject.day))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.day
      )
    })

    it(
      'should set month and date of minDate when select year equal to ' +
        'minDate year',
      () => {
        const { getByText } = render(
          <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
        )
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        expect(getByText('02')).toBeInTheDocument()
        expect(getByText('20')).toBeInTheDocument()
      }
    )

    it('should set first year month and first month day when select year not equal to minDate year', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2018'))
      expect(queryAllByText('01')[0]).toBeInTheDocument()
      expect(queryAllByText('01')[1]).toBeInTheDocument()
    })

    it('should set minDate day when preselect minDate year and minDate month', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      fireEvent.click(getByText('02'))
      fireEvent.click(queryAllByText('02')[1])
      expect(getByText('20')).toBeInTheDocument()
    })

    it('should set first month day when preselect different minDate month in minDate year', () => {
      const { getByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      fireEvent.click(getByText('02'))
      fireEvent.click(getByText('03'))
      expect(getByText('01')).toBeInTheDocument()
    })

    it('should not contain year lower to minDate year', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      expect(queryAllByText('2016')).toHaveLength(0)
    })

    it('should not contain months lower to minDate month when selected year equal to minDate year', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      fireEvent.click(getByText('02'))
      expect(queryAllByText('01')).toHaveLength(0)
    })

    it('should not contain day lower to minDate day when selected year and month equal to minDate year/month', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent dateFormat="YYYY-MM-DD" minDate="2017-02-20" />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      fireEvent.click(getByText('20'))
      expect(queryAllByText('19')).toHaveLength(0)
    })
  })

  describe('should recive maxDate property', () => {
    it('should select highest available date, this should be maxDate', () => {
      const { getByText, container, getAllByText } = render(
        <DateSelectorComponent dateFormat={dateFormat} maxDate={maxDate} />
      )
      fireEvent.click(getByText('Año'))
      let curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.year
      )
      fireEvent.click(getByText(maxDateObject.year))
      fireEvent.click(getAllByText('01')[0])
      curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.month
      )
      fireEvent.click(getByText(maxDateObject.month))
      fireEvent.click(
        maxDateObject.month === '01' ? getAllByText('01')[1] : getByText('01')
      )
      curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.day
      )
    })

    it('should set first month and first day of year when select year equal to maxDate year', () => {
      const { getByText, container, getAllByText } = render(
        <DateSelectorComponent dateFormat={dateFormat} maxDate={maxDate} />
      )
      fireEvent.click(getByText('Año'))
      const curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.year
      )
      fireEvent.click(getByText((+maxDateObject.year - 1).toString()))
      expect(getAllByText('01')[0]).toBeInTheDocument()
      expect(getAllByText('01')[1]).toBeInTheDocument()
    })

    it('should set minDate month and minDate day when select year equal to maxDate year and minDate year', () => {
      const { getByText } = render(
        <DateSelectorComponent
          dateFormat={dateFormat}
          maxDate="2021-10-12"
          minDate="2021-03-18"
        />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2021'))
      expect(getByText('03')).toBeInTheDocument()
      expect(getByText('18')).toBeInTheDocument()
    })

    it('should show month between maxDate and minDate, when maxDate year is equal to minDate year ', () => {
      const { getByText, container } = render(
        <DateSelectorComponent
          dateFormat={dateFormat}
          maxDate="2021-10-12"
          minDate="2021-03-18"
        />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2021'))
      fireEvent.click(getByText('03'))
      const querySelector = container.querySelectorAll('li')
      expect(querySelector[0].innerHTML).toContain('03')
      expect(querySelector[querySelector.length - 1].innerHTML).toContain('10')
    })

    it('should show days between maxDate and minDate, when maxDate year is equal to minDate year ', () => {
      const { getByText, container } = render(
        <DateSelectorComponent
          dateFormat={dateFormat}
          maxDate="2021-03-27"
          minDate="2021-03-05"
        />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2021'))
      fireEvent.click(getByText('05'))
      const querySelector = container.querySelectorAll('li')
      expect(querySelector[0].innerHTML).toContain('05')
      expect(querySelector[querySelector.length - 1].innerHTML).toContain('27')
    })

    it('should set maxDate with 2 years bigger to currentDate, when not pass maxDate property', () => {
      const { getByText, container, getAllByText } = render(
        <DateSelectorComponent dateFormat={dateFormat} />
      )
      fireEvent.click(getByText('Año'))
      let querySelector = container.querySelectorAll('li')
      expect(querySelector[querySelector.length - 1].innerHTML).toContain(
        maxDateObject.year
      )
      fireEvent.click(getByText(maxDateObject.year))
      fireEvent.click(getAllByText('01')[0])
      querySelector = container.querySelectorAll('li')
      expect(querySelector[querySelector.length - 1].innerHTML).toContain(
        maxDateObject.month
      )
      fireEvent.click(getByText(maxDateObject.month))
      fireEvent.click(
        maxDateObject.month === '01' ? getAllByText('01')[1] : getByText('01')
      )
      querySelector = container.querySelectorAll('li')
      expect(querySelector[querySelector.length - 1].innerHTML).toContain(
        maxDateObject.day
      )
    })
  })
})

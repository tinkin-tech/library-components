import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import DateUtils from '../../utils/dateUtils/dateUtils'
import { TestUtil } from '../../utils/testUtils/testUtils'
import { DateSelectorComponent } from './DateSelectorComponent'

describe('render component <DateSelectorComponent />', () => {
  const dateFormat = 'YYYY-MM-DD'
  const currentDate = DateUtils.formatDate(new Date(), null, dateFormat)
  const minDate = DateUtils.substractDate(currentDate, dateFormat, 2, 'years')
  const minDateObject = DateUtils.dateStringToObject(minDate, dateFormat)
  const maxDate = DateUtils.addDate(currentDate, dateFormat, 2, 'years')
  const maxDateObject = DateUtils.dateStringToObject(maxDate, dateFormat)
  const mockOnChangeDate = jest.fn()

  describe('should select year, month and day', () => {
    it('should render DateSelectorComponent and select year', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, rerender } = render(getComponent())
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText(minDateObject.year))
      rerender(getComponent())
      expect(getByText(minDateObject.year)).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select month', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, getAllByText, rerender } = render(getComponent())
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText(minDateObject.year))
      rerender(getComponent())
      fireEvent.click(getByText(minDateObject.month))
      fireEvent.click(getAllByText(minDateObject.month)[1])
      rerender(getComponent())
      expect(getByText(minDateObject.month)).toBeInTheDocument()
    })

    it('should render DateSelectorComponent and select day', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, getAllByText, rerender } = render(getComponent())
      const getDateByQuery = (): HTMLElement =>
        minDateObject.day === '01' || minDateObject.day === '12'
          ? getAllByText(minDateObject.day)[1]
          : getByText(minDateObject.day)
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText((parseInt(minDateObject.year) + 1).toString()))
      rerender(getComponent())
      fireEvent.click(getAllByText('01')[0])
      fireEvent.click(getAllByText('12')[0])
      rerender(getComponent())
      fireEvent.click(getByText('01'))
      fireEvent.click(getDateByQuery())
      rerender(getComponent())
      expect(getDateByQuery()).toBeInTheDocument()
    })

    it(
      'should show day options when format is MM-DD, set year with ' +
        'current',
      () => {
        const { getByText, container } = render(
          <DateSelectorComponent
            dateFormat="MM-DD"
            date="04-02"
            onChangeDate={null}
            valueId="date"
          />
        )
        fireEvent.click(getByText('02'))
        expect(container.getElementsByTagName('li')).toHaveLength(30)
      }
    )

    it('Should close selector when press in document outside selector', () => {
      const { getByText, container } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          date=""
          onChangeDate={(): void => null}
          valueId="date"
        />
      )
      fireEvent.click(getByText('Año'))
      expect(container.getElementsByTagName('li')).toHaveLength(5)
      fireEvent.click(document)
      expect(container.getElementsByTagName('li')).toHaveLength(0)
    })
  })

  describe('should recive date format property', () => {
    it('should render DateSelectorComponent with dateFormat YYYY-MM-DD', () => {
      const { getByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          date=""
          onChangeDate={mockOnChangeDate}
          valueId="date"
        />
      )
      expect(getByText('Año')).toBeInTheDocument()
      expect(getByText('Mes')).toBeInTheDocument()
      expect(getByText('Día')).toBeInTheDocument()
    })

    it('should render DateSelectorComponent with dateFormat YYYY-MM', () => {
      const { getByText, queryByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          onChangeDate={mockOnChangeDate}
          valueId="date"
        />
      )
      expect(getByText('Año')).toBeInTheDocument()
      expect(getByText('Mes')).toBeInTheDocument()
      expect(queryByText('Día')).toBeNull()
    })

    it('should render DateSelectorComponent with dateFormat MM-DD', () => {
      const { getByText, queryByText } = render(
        <DateSelectorComponent
          dateFormat="MM-DD"
          date=""
          onChangeDate={mockOnChangeDate}
          valueId="date"
        />
      )
      expect(getByText('Mes')).toBeInTheDocument()
      expect(getByText('Día')).toBeInTheDocument()
      expect(queryByText('Año')).toBeNull()
    })
  })

  describe('should recive minDate property', () => {
    it('should select lowest available date, this should be minDate', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          minDate="2019-03-02"
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, container, queryAllByText, rerender } = render(
        getComponent()
      )
      fireEvent.click(getByText('Año'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('2019')
      fireEvent.click(getByText('2019'))
      rerender(getComponent())
      fireEvent.click(getByText('03'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('03')
      fireEvent.click(queryAllByText('03')[1])
      rerender(getComponent())
      fireEvent.click(getByText('02'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain('02')
    })

    it('should set min date when its not provided', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, container, getAllByText, rerender } = render(
        getComponent()
      )
      fireEvent.click(getByText('Año'))
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.year
      )
      fireEvent.click(getByText(minDateObject.year))
      rerender(getComponent())
      fireEvent.click(
        minDateObject.day === minDateObject.month
          ? getAllByText(minDateObject.month)[0]
          : getByText(minDateObject.month)
      )
      expect(container.querySelectorAll('li')[0].innerHTML).toContain(
        minDateObject.month
      )
      fireEvent.click(getAllByText(minDateObject.month)[1])
      const getDateByQuery =
        minDateObject.day === minDateObject.month
          ? getAllByText(minDateObject.day)[1]
          : getByText(minDateObject.day)
      expect(getDateByQuery).toBeTruthy()
    })

    it(
      'should set month and date of minDate when select year equal to ' +
        'minDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        rerender(getComponent())
        expect(getByText('02')).toBeInTheDocument()
        expect(getByText('20')).toBeInTheDocument()
      }
    )

    it(
      'should set first year month and first month day when select year not' +
        'equal to minDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, queryAllByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2018'))
        rerender(getComponent())
        expect(queryAllByText('01')[0]).toBeInTheDocument()
        expect(queryAllByText('01')[1]).toBeInTheDocument()
      }
    )

    it(
      'should set minDate of day, when preselect minDate year and minDate ' +
        'month',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, queryAllByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        rerender(getComponent())
        fireEvent.click(getByText('02'))
        fireEvent.click(queryAllByText('02')[1])
        rerender(getComponent())
        expect(getByText('20')).toBeInTheDocument()
      }
    )

    it(
      'should set first month day when preselect different minDate month in ' +
        'minDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        rerender(getComponent())
        fireEvent.click(getByText('02'))
        fireEvent.click(getByText('03'))
        rerender(getComponent())
        expect(getByText('01')).toBeInTheDocument()
      }
    )

    it('should not contain year lower to minDate year', () => {
      const { getByText, queryAllByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          minDate="2017-02-20"
          date=""
          onChangeDate={mockOnChangeDate}
          valueId="date"
        />
      )
      fireEvent.click(getByText('Año'))
      fireEvent.click(getByText('2017'))
      expect(queryAllByText('2016')).toHaveLength(0)
    })

    it(
      'should not contain months lower to minDate month when selected year ' +
        'equal to minDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, queryAllByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        rerender(getComponent())
        fireEvent.click(getByText('02'))
        expect(queryAllByText('01')).toHaveLength(0)
      }
    )

    it(
      'should not contain day lower to minDate day when selected year and ' +
        'month equal to minDate year/month',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            minDate="2017-02-20"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, queryAllByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2017'))
        rerender(getComponent())
        fireEvent.click(getByText('20'))
        expect(queryAllByText('19')).toHaveLength(0)
      }
    )
  })

  describe('should recive maxDate property', () => {
    it('should select highest available date, this should be maxDate', () => {
      const mockUtil = new TestUtil()
      const getComponent = (): React.ReactElement => (
        <DateSelectorComponent
          dateFormat={dateFormat}
          maxDate={maxDate}
          date={mockUtil.getValue()}
          onChangeDate={mockUtil.mockedFunction}
          valueId="date"
        />
      )
      const { getByText, container, getAllByText, rerender } = render(
        getComponent()
      )
      fireEvent.click(getByText('Año'))
      let curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.year
      )
      fireEvent.click(getByText(maxDateObject.year))
      rerender(getComponent())
      fireEvent.click(getAllByText('01')[0])
      curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.month
      )
      fireEvent.click(getAllByText(maxDateObject.month)[0])
      rerender(getComponent())
      fireEvent.click(
        maxDateObject.month === '01' ? getAllByText('01')[1] : getByText('01')
      )
      curretSelector = container.querySelectorAll('li')
      expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
        maxDateObject.day
      )
    })

    it(
      'should set first month and first day of year when select year equal ' +
        'to maxDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat={dateFormat}
            maxDate={maxDate}
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, container, getAllByText, rerender } = render(
          getComponent()
        )
        fireEvent.click(getByText('Año'))
        const curretSelector = container.querySelectorAll('li')
        expect(curretSelector[curretSelector.length - 1].innerHTML).toContain(
          maxDateObject.year
        )
        fireEvent.click(getByText((+maxDateObject.year - 1).toString()))
        rerender(getComponent())
        expect(getAllByText('01')[0]).toBeInTheDocument()
        expect(getAllByText('01')[1]).toBeInTheDocument()
      }
    )

    it(
      'should set minDate month and minDate day when select year equal to ' +
        'maxDate year and minDate year',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat={dateFormat}
            maxDate="2021-10-12"
            minDate="2021-03-18"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2021'))
        rerender(getComponent())
        expect(getByText('03')).toBeInTheDocument()
        expect(getByText('18')).toBeInTheDocument()
      }
    )

    it(
      'should show month between maxDate and minDate, when maxDate year is ' +
        'equal to minDate year ',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat={dateFormat}
            maxDate="2021-10-12"
            minDate="2021-03-18"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, container, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2021'))
        rerender(getComponent())
        fireEvent.click(getByText('03'))
        const querySelector = container.querySelectorAll('li')
        expect(querySelector[0].innerHTML).toContain('03')
        expect(querySelector[querySelector.length - 1].innerHTML).toContain(
          '10'
        )
      }
    )

    it(
      'should show days between maxDate and minDate, when maxDate year is ' +
        'equal to minDate year ',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat={dateFormat}
            maxDate="2021-03-27"
            minDate="2021-03-05"
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, container, rerender } = render(getComponent())
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2021'))
        rerender(getComponent())
        fireEvent.click(getByText('05'))
        const querySelector = container.querySelectorAll('li')
        expect(querySelector[0].innerHTML).toContain('05')
        expect(querySelector[querySelector.length - 1].innerHTML).toContain(
          '27'
        )
      }
    )

    it(
      'should set maxDate with 2 years bigger to currentDate, when not ' +
        'pass maxDate property',
      () => {
        const mockUtil = new TestUtil()
        const getComponent = (): React.ReactElement => (
          <DateSelectorComponent
            dateFormat={dateFormat}
            date={mockUtil.getValue()}
            onChangeDate={mockUtil.mockedFunction}
            valueId="date"
          />
        )
        const { getByText, container, getAllByText, rerender } = render(
          getComponent()
        )
        fireEvent.click(getByText('Año'))
        let querySelector = container.querySelectorAll('li')
        expect(querySelector[querySelector.length - 1].innerHTML).toContain(
          maxDateObject.year
        )
        fireEvent.click(getByText(maxDateObject.year))
        rerender(getComponent())
        fireEvent.click(getAllByText('01')[0])
        querySelector = container.querySelectorAll('li')
        expect(querySelector[querySelector.length - 1].innerHTML).toContain(
          maxDateObject.month
        )
        fireEvent.click(getAllByText(maxDateObject.month)[0])
        rerender(getComponent())
        fireEvent.click(
          maxDateObject.month === '01' ? getAllByText('01')[1] : getByText('01')
        )
        rerender(getComponent())
        querySelector = container.querySelectorAll('li')
        expect(querySelector[querySelector.length - 1].innerHTML).toContain(
          maxDateObject.day
        )
      }
    )
  })

  describe('should pass date', () => {
    it(
      'Should set date in year, month and day section when pass date ' +
        'property',
      () => {
        const { getByText } = render(
          <DateSelectorComponent
            dateFormat={dateFormat}
            date="2020-10-12"
            onChangeDate={mockOnChangeDate}
            valueId="date"
          />
        )
        expect(getByText('2020')).toBeInTheDocument()
        expect(getByText('10')).toBeInTheDocument()
        expect(getByText('12')).toBeInTheDocument()
      }
    )

    it(
      'Should not open month or date selectors when selected date in null ' +
        'or empty',
      () => {
        const { getByText, container } = render(
          <DateSelectorComponent
            dateFormat={dateFormat}
            date=""
            onChangeDate={mockOnChangeDate}
            valueId="date"
          />
        )
        fireEvent.click(getByText('Mes'))
        expect(container.querySelectorAll('li')).toHaveLength(0)
        fireEvent.click(getByText('Día'))
        expect(container.querySelectorAll('li')).toHaveLength(0)
      }
    )
  })

  describe('should pass onChangeDate', () => {
    it(
      'Should call onChangeDate and receive the date selected from user and ' +
        'valueId prop',
      () => {
        const { getByText } = render(
          <DateSelectorComponent
            minDate="2019-12-24"
            maxDate="2020-12-24"
            dateFormat={dateFormat}
            date=""
            valueId="date"
            onChangeDate={mockOnChangeDate}
          />
        )
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2020'))
        expect(mockOnChangeDate).toHaveBeenCalledWith('2020-01-01', 'date')
      }
    )

    it(
      'Should call onChangeDate and receive the date selected from user and ' +
        'valueId prop in the dateFormat MM-DD',
      () => {
        const { getByText } = render(
          <DateSelectorComponent
            minDate="01-30"
            maxDate="12-30"
            dateFormat="MM-DD"
            date=""
            valueId="date"
            onChangeDate={mockOnChangeDate}
          />
        )
        fireEvent.click(getByText('Mes'))
        fireEvent.click(getByText('05'))
        expect(mockOnChangeDate).toHaveBeenCalledWith('05-01', 'date')
      }
    )

    it(
      'Should call onChangeDate and receive the date selected from user and ' +
        'valueId prop in the dateFormat YYYY-MM',
      () => {
        const { getByText } = render(
          <DateSelectorComponent
            minDate="2020-08"
            maxDate="2022-06"
            dateFormat="YYYY-MM"
            date=""
            valueId="date"
            onChangeDate={mockOnChangeDate}
          />
        )
        fireEvent.click(getByText('Año'))
        fireEvent.click(getByText('2020'))
        expect(mockOnChangeDate).toHaveBeenCalledWith('2020-08', 'date')
      }
    )
  })

  describe('should pass label', () => {
    it('Should pass label prop and render in component', () => {
      const { getByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          valueId="date"
          onChangeDate={mockOnChangeDate}
          label="My Date"
        />
      )
      expect(getByText('My Date')).toBeInTheDocument()
    })
  })

  describe('should pass error prop', () => {
    it('Should pass error prop and render in component', () => {
      const { getByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          valueId="date"
          onChangeDate={mockOnChangeDate}
          error="error for test"
        />
      )
      expect(getByText('error for test')).toBeInTheDocument()
    })

    it(
      'Should label have "label-error" and content have "date-selector-error"' +
        ' className, when pass error and label',
      () => {
        const { getByText, container } = render(
          <DateSelectorComponent
            dateFormat="YYYY-MM"
            date=""
            valueId="date"
            onChangeDate={mockOnChangeDate}
            error="error for test"
            label="My Label"
          />
        )
        expect(getByText('My Label').className).toContain('label-error')
        expect(container.innerHTML).toContain('date-selector-error')
      }
    )
  })

  describe('should pass required prop', () => {
    it('should add "*" in label when pass required and label prop', () => {
      const { getByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          valueId="date"
          onChangeDate={mockOnChangeDate}
          label="My Label"
          required={true}
        />
      )
      expect(getByText('My Label*')).toBeInTheDocument()
    })
  })

  describe('should pass labelClassName prop', () => {
    it('should replace className of label with labelClassName', () => {
      const { rerender, container } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          valueId="date"
          onChangeDate={mockOnChangeDate}
          label="My Label"
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toBe('label')
      rerender(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date=""
          valueId="date"
          onChangeDate={mockOnChangeDate}
          label="My Label"
          labelClassName="custom-class-name"
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toBe(
        'custom-class-name'
      )
    })
  })

  describe('should pass inputClassName prop', () => {
    it('should replace className of content with inputClassName', () => {
      const { rerender, container } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM"
          date="2010-02"
          valueId="date"
          onChangeDate={mockOnChangeDate}
        />
      )
      expect(container.getElementsByTagName('div')[1].className).toBe(
        'date-selector-content'
      )
      rerender(
        <DateSelectorComponent
          dateFormat="MM-DD"
          date="02-20"
          valueId="date"
          onChangeDate={mockOnChangeDate}
          inputClassName="custom-class-name"
        />
      )
      expect(container.getElementsByTagName('div')[1].className).toBe(
        'custom-class-name'
      )
    })
  })

  describe('when recive disabled prop', () => {
    it(
      'Should add dateselector-component-disabled class in ' +
        'component when disabled prop is true',
      () => {
        const { container } = render(
          <DateSelectorComponent
            dateFormat="YYYY-MM-DD"
            onChangeDate={mockOnChangeDate}
            date="2020-02-01"
            valueId=""
            disabled={true}
          />
        )
        expect(container.getElementsByTagName('div')[0].className).toContain(
          'date-selector-component-disabled'
        )
      }
    )

    it('Shouldnt open options when disabled prop is true', () => {
      const { container, getByText } = render(
        <DateSelectorComponent
          dateFormat="YYYY-MM-DD"
          onChangeDate={mockOnChangeDate}
          date=""
          valueId=""
          disabled={true}
        />
      )
      fireEvent.click(getByText('Año'))
      expect(container.getElementsByTagName('li')).toHaveLength(0)
    })
  })
})

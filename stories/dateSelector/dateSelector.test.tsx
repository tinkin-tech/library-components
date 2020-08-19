import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { DateSelectorComponent } from './DateSelectorComponent'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const dateSelectorDefault = (
  <DateSelectorComponent
    date="20-07-2020"
    dateFormat="YYYY-MM-DD"
    label="date selector"
    onChangeDate={(): null => null}
    error=""
    required={true}
    minDate="2020-07-18"
    maxDate="2020-07-22"
    id="dateSelector"
  />
)

describe('', () => {
  it('Should render in virtual DOM', () => {
    const { getByTestId } = render(dateSelectorDefault)
    expect(getByTestId('dateSelectorComponent')).toBeInTheDocument()
  })

  it('Should shot the snapshot with all properties', () => {
    const component = renderer.create(dateSelectorDefault)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })

  it(
    'Should onChangeDate function return id passed in properties and date' +
      'change year when change year input',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="dateSelector"
          date="2020-07-20"
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      renderer.act(() => {
        fireEvent.change(getByTestId('input-year'), {
          target: { value: '2018' },
        })
      })
      expect(onChangeFake).toHaveBeenCalledTimes(1)
      expect(onChangeFake.mock.results[0].value).toMatchObject({
        id: 'dateSelector',
        date: '2018-01-01',
      })
    }
  )

  it(
    'Should onChangeDate function return id passed in properties and date ' +
      'changed month when change month input',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="selector"
          date="2019-12-10"
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      renderer.act(() => {
        fireEvent.change(getByTestId('input-month'), {
          target: { value: '03' },
        })
      })
      expect(onChangeFake.mock.results[0].value).toMatchObject({
        id: 'selector',
        date: '2019-03-01',
      })
    }
  )

  it(
    'Should onChangeDate function return id passed in properties and date' +
      'changed day when change day input',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="selector"
          date="2020-07-22"
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      renderer.act(() => {
        fireEvent.change(getByTestId('input-day'), {
          target: { value: '11' },
        })
      })
      expect(onChangeFake.mock.results[0].value).toMatchObject({
        id: 'selector',
        date: '2020-07-11',
      })
    }
  )

  it('Should set month and day 01 when change year input', () => {
    const onChangeFake = jest.fn((id: string, date: string): {
      id: string
      date: string
    } => ({ id, date }))
    const { getByTestId } = render(
      <DateSelectorComponent
        id="selector"
        date="2020-07-22"
        onChangeDate={onChangeFake}
        dateFormat="YYYY-MM-DD"
      />
    )
    renderer.act(() => {
      fireEvent.change(getByTestId('input-year'), {
        target: { value: '2010' },
      })
    })
    expect(onChangeFake.mock.results[0].value).toMatchObject({
      id: 'selector',
      date: '2010-01-01',
    })
  })

  it('Should set day empty 01 change month input', () => {
    const onChangeFake = jest.fn((id: string, date: string): {
      id: string
      date: string
    } => ({ id, date }))
    const { getByTestId } = render(
      <DateSelectorComponent
        id="selector"
        date="2020-07-22"
        onChangeDate={onChangeFake}
        dateFormat="YYYY-MM-DD"
      />
    )
    renderer.act(() => {
      fireEvent.change(getByTestId('input-month'), {
        target: { value: '02' },
      })
    })
    expect(onChangeFake.mock.results[0].value).toMatchObject({
      id: 'selector',
      date: '2020-02-01',
    })
  })

  it('Should set empty string in input values when pass empty date', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="datepicker"
        date=""
        onChangeDate={null}
        dateFormat="YYYY-MM-DD"
      />
    )
    const yearInput = getByTestId('input-year')
    const monthInput = getByTestId('input-month')
    const dayInput = getByTestId('input-day')
    expect(yearInput).toMatchObject({ value: '' })
    expect(monthInput).toMatchObject({ value: '' })
    expect(dayInput).toMatchObject({ value: '' })
  })

  it(
    'Should month input have disable property when have date without year ' +
      'in props',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="date"
          date=""
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      const inputMonth = getByTestId('input-month')
      expect(inputMonth).toMatchObject({ disabled: true })
    }
  )

  it(
    'Should day input have disable property when have date without month' +
      'in props',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="date"
          date="2020"
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      const inputDay = getByTestId('input-day')
      expect(inputDay).toMatchObject({ disabled: true })
    }
  )

  it(
    'Should month input have disable property in false when have date' +
      ' with year',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="date"
          date="2020"
          onChangeDate={onChangeFake}
          dateFormat="YYYY-MM-DD"
        />
      )
      const inputMonth = getByTestId('input-month')
      expect(inputMonth).toMatchObject({ disabled: false })
    }
  )

  it('Should set month and day of minDate when change year', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="minDateTest"
        date=""
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
        minDate="2020-10-11"
        maxDate="2020-12-25"
      />
    )
    renderer.act(() => {
      fireEvent.change(getByTestId('input-year'), {
        target: { value: '2020' },
      })
    })
    const inputMonth = getByTestId('input-month')
    const inputDay = getByTestId('input-day')
    expect(inputMonth).toMatchObject({ value: '10' })
    expect(inputDay).toMatchObject({ value: '12' })
  })

  it('Should set day of minDate when change month', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="minDateMonth"
        date=""
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
        minDate="2020-10-20"
        maxDate="2020-12-23"
      />
    )
    renderer.act(() => {
      fireEvent.change(getByTestId('input-month'), {
        target: { value: '2020' },
      })
    })
    const inputDay = getByTestId('input-day')
    expect(inputDay).toMatchObject({ value: '21' })
  })

  it(
    'Should set month + 1 of minDate and day 01 when day of minDate is end' +
      ' of the month',
    () => {
      const { getByTestId } = render(
        <DateSelectorComponent
          id="dateSelector"
          date=""
          onChangeDate={(): void => null}
          dateFormat="YYYY-MM-DD"
          minDate="2018-01-31"
          maxDate="2020-10-20"
        />
      )
      renderer.act(() => {
        fireEvent.change(getByTestId('input-year'), {
          target: { value: '2019' },
        })
      })
      const inputMonth = getByTestId('input-month')
      const inputDay = getByTestId('input-day')
      expect(inputMonth).toMatchObject({ value: '02' })
      expect(inputDay).toMatchObject({ value: '01' })
    }
  )

  it('Should get years between minDate and maxDate', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date=""
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
        minDate="2013-01-31"
        maxDate="2020-10-20"
      />
    )
    renderer.act(() => {
      fireEvent.click(getByTestId('input-year'))
    })
    const selectorYear = getByTestId('selector-year')
    expect(selectorYear.innerHTML).toContain('2013')
    expect(selectorYear.innerHTML).toContain('2015')
    expect(selectorYear.innerHTML).toContain('2020')
  })

  it('Should get months in year', () => {
    const { getByTestId } = render(dateSelectorDefault)
    renderer.act(() => {
      fireEvent.click(getByTestId('input-month'))
    })
    const selectorMonth = getByTestId('selector-month')
    expect(selectorMonth.innerHTML).toContain('01')
    expect(selectorMonth.innerHTML).toContain('10')
    expect(selectorMonth.innerHTML).toContain('12')
  })

  it('Should get days in moth selected, contain 31 days', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="2020-01-01"
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
      />
    )
    renderer.act(() => {
      fireEvent.click(getByTestId('input-day'))
    })
    const selectorDay = getByTestId('selector-day')
    expect(selectorDay.innerHTML).toContain('01')
    expect(selectorDay.innerHTML).toContain('31')
  })

  it('Should get days in moth selected, contain 28 days', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="2013-02-01"
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
      />
    )
    renderer.act(() => {
      fireEvent.click(getByTestId('input-day'))
    })
    const selectorDay = getByTestId('selector-day')
    expect(selectorDay.innerHTML).toContain('01')
    expect(selectorDay.innerHTML).toContain('28')
    expect(selectorDay.innerHTML).not.toContain('29')
    expect(selectorDay.innerHTML).not.toContain('31')
  })

  it('Should get days in moth selected, contain 29 days', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="2020-02-01"
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
      />
    )
    renderer.act(() => {
      fireEvent.click(getByTestId('input-day'))
    })
    const selectorDay = getByTestId('selector-day')
    expect(selectorDay.innerHTML).toContain('01')
    expect(selectorDay.innerHTML).toContain('29')
    expect(selectorDay.innerHTML).not.toContain('31')
  })

  it('Should show label in document', () => {
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="2020-02-01"
        onChangeDate={(): void => null}
        label="Es un label"
        dateFormat="YYYY-MM-DD"
      />
    )
    const labelDiv = getByTestId('label')
    expect(labelDiv).toBeInTheDocument()
  })

  it('Should label div not in document', () => {
    const { container } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="2020-02-01"
        onChangeDate={(): void => null}
        dateFormat="YYYY-MM-DD"
      />
    )
    expect(container.innerHTML).not.toContain(
      '<div data-testid="label">{label}</div>'
    )
  })
})

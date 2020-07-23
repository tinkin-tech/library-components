import * as React from 'react'
import * as renderer from 'react-test-renderer'
import DateSelectorComponent from './DateSelectorComponent'
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
        date: '2018--',
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
        date: '2019-03-',
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

  it('Should set month and day empty when change year input', () => {
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
      date: '2010--',
    })
  })

  it('Should set day empty when change month input', () => {
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
      date: '2020-02-',
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
})

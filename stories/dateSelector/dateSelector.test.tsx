import * as React from 'react'
import * as renderer from 'react-test-renderer'
import DateSelectorComponent from './DateSelectorComponent'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const dateSelectorDefault = (
  <DateSelectorComponent
    date="20-07-2020"
    dateFormat="DD-MM-YYYY"
    label="date selector"
    onChangeDate={(): null => null}
    error=""
    required={true}
    minDate="18-07-2020"
    maxDate="22-07-2020"
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

  it('Should onChangeDate function return id and date', () => {
    const onChangeFake = jest.fn((id: string, date: string): {
      id: string
      date: string
    } => ({ id, date }))
    const { getByTestId } = render(
      <DateSelectorComponent
        id="dateSelector"
        date="20-07-2020"
        onChangeDate={onChangeFake}
        dateFormat="DD-MM-YYYY"
      />
    )
    renderer.act(() => {
      fireEvent.change(getByTestId('input-year'), {
        target: { value: '2020' },
      })
    })
    expect(onChangeFake).toHaveBeenCalledTimes(1)
    expect(onChangeFake.mock.results[0].value).toMatchObject({
      id: 'dateSelector',
      date: '20-07-2020',
    })
  })

  it(
    'Should onChangeDate function return id passed in properties and date ' +
      'changed month',
    () => {
      const onChangeFake = jest.fn((id: string, date: string): {
        id: string
        date: string
      } => ({ id, date }))
      const { getByTestId } = render(
        <DateSelectorComponent
          id="selector"
          date="12-2019"
          onChangeDate={onChangeFake}
          dateFormat="MM-YYYY"
        />
      )
      renderer.act(() => {
        fireEvent.change(getByTestId('input-month'), {
          target: { value: '2020' },
        })
      })
      expect(onChangeFake.mock.results[0].value).toMatchObject({
        id: 'selector',
        date: '11-2019',
      })
    }
  )
})

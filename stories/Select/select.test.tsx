import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import { action } from '@storybook/addon-actions'
import '@testing-library/jest-dom/extend-expect'
import addons, { mockChannel } from '@storybook/addons'
import { OptionsInterface, SelectComponent } from './Select'

addons.setChannel(mockChannel())

const options: OptionsInterface[] = [
  {
    id: 'option1',
    value: 'option1',
  },
  {
    id: 'option2',
    value: 'option2',
  },
  {
    id: 'option3',
    value: 'option3',
  },
]

const defaultSelect = (
  <SelectComponent
    onChange={action('selected')}
    options={options}
    className="simple-select"
    placeholder={'Select an option'}
    displayArrow={true}
    id="select"
    error={''}
    disabled={false}
  />
)

describe('Select test', () => {
  it('Should render in virtual DOM', () => {
    const { getByTestId } = render(defaultSelect)
    expect(getByTestId('selectorComponent')).toBeInTheDocument()
  })

  it('Should shot the snapshot with all properties', () => {
    const comp = renderer.create(defaultSelect)
    const compJSON = comp.toJSON()
    expect(compJSON).toMatchSnapshot()
  })

  it('Should call action function one time when click option', () => {
    const act = jest.fn()
    const comp = render(
      <SelectComponent
        onChange={act}
        id="select"
        options={options}
        className="simple-select"
        placeholder={'Select an option'}
        displayArrow={true}
        error={''}
        disabled={false}
      />
    )
    renderer.act(() => {
      fireEvent.click(comp.getByTestId('simple-select-option1'))
    })
    expect(act).toHaveBeenCalledTimes(1)
  })

  it('should change component selected value', () => {
    const act = jest.fn()
    const comp = render(
      <SelectComponent
        onChange={act}
        options={options}
        id="select"
        className="simple-select"
        placeholder={'Select an option'}
        displayArrow={true}
        error={''}
        disabled={false}
      />
    )
    renderer.act(() => {
      fireEvent.click(comp.getByTestId('simple-select-option1'))
    })
    expect(comp.getByTestId('selected-option')).toMatchObject({
      value: 'option1',
    })
  })

  it('should change options on search', () => {
    const act = jest.fn()
    const comp = render(
      <SelectComponent
        onChange={act}
        id="select"
        options={options}
        className="simple-select"
        placeholder={'Select an option'}
        displayArrow={true}
        error={''}
        disabled={false}
        search={true}
      />
    )
    renderer.act(() => {
      fireEvent.change(comp.getByTestId('selected-option'), {
        target: { value: '1' },
      })
    })
    expect(comp.container.innerHTML).not.toContain('selected-option-2')
  })
})

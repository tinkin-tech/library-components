import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react'
import { Option } from './Select';
import Select from './Select';
import { action } from '@storybook/addon-actions'
import '@testing-library/jest-dom/extend-expect'
import addons, { mockChannel } from '@storybook/addons';

addons.setChannel(mockChannel());

const options: Option[] = [
  {
    id: 'option1',
    value: 'option1'
  },
  {
    id: 'option2',
    value: 'option2'
  },
  {
    id: 'option3',
    value: 'option3'
  }
]

const defaultSelect = (
  <Select
    onChange={action('selected')}
    options={options}
    className='simple-select'
    placeholder={'Select an option'}
    borderStyle={true}
    displayArrow={true}
    error={''}
    disable={false}
  />
)

describe('Select test', () => {

  it('Should render in virtual DOM', () => {
    const { getByTestId } = render(defaultSelect)
    expect(getByTestId('selectorComponent')).toBeInTheDocument()
  })

  it('Should shot the snapshot with all properties', () => {
    const component = renderer.create(defaultSelect)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })


  it('Should call action function one time when click option', async () => {
    const act = jest.fn();
    const compo = render(
      <Select
        onChange={act}
        options={options}
        className='simple-select'
        placeholder={'Select an option'}
        borderStyle={true}
        displayArrow={true}
        error={''}
        disable={false}
      />
    )
    renderer.act(() => {
      fireEvent.click(compo.getByTestId('simple-select-option1'));
    })
    expect(act).toBeCalledTimes(1);
  });

  it('should change component selected value', async () => {
    const act = jest.fn();
    const compo = render(
      <Select
        onChange={act}
        options={options}
        className='simple-select'
        placeholder={'Select an option'}
        borderStyle={true}
        displayArrow={true}
        error={''}
        disable={false}
      />
    )
    renderer.act(() => {
      fireEvent.click(compo.getByTestId('simple-select-option1'));
    })
    expect(compo.getByTestId('selected-option').innerHTML).toBe('option1');
  }) 
});

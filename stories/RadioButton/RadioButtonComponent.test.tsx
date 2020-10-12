import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { RadioButtonComponent } from './RadioButtonComponent'

describe('render component <RadioButtonComponent />', () => {
  const func = jest.fn()
  const options = [
    {
      id: 'id1',
      label: 'label1',
    },
    {
      id: 'id2',
      label: 'label2',
    },
    {
      id: 'id3',
      label: 'label3',
    },
  ]

  const value = 'id1'

  describe('when receiving options property', () => {
    it('should render options list items', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(3)
      expect(container.getElementsByTagName('label')).toHaveLength(3)
    })

    it('should show any options when list is empty', () => {
      const { container } = render(
        <RadioButtonComponent
          options={[]}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('when receiving values property', () => {
    it('should receive values property with radio value', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(
        container.getElementsByClassName('selected')[0].firstElementChild
      ).toHaveAttribute('id', value)
    })
  })

  describe('when receiving onChangeValues property', () => {
    it('should receive new id if selected different than value', () => {
      const { getByText } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          value={value}
          valueId={'radioButtonValueId'}
        />
      )
      fireEvent.click(getByText('label2'))
      expect(func).toHaveBeenCalledWith('id2', 'radioButtonValueId')
      expect(func).toHaveBeenCalledTimes(1)
      jest.clearAllMocks()
    })

    it('should do nothing if same id is selected', () => {
      const { getByText } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          value={value}
          valueId={'radioButtonValueId'}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
      jest.clearAllMocks()
    })
  })

  describe('when receiving disabled property', () => {
    it('should not execute onChangeValues when is disabled', () => {
      const { getByText } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          disabled={true}
          value={value}
          valueId={'radioButtonValueId'}
        />
      )
      fireEvent.click(getByText('label2'))
      expect(func).toHaveBeenCalledTimes(0)
      jest.clearAllMocks()
    })

    it(
      'should add disabled-radio-button class to parent when disabled ' +
        'is true',
      () => {
        const { container } = render(
          <RadioButtonComponent
            options={options}
            disabled={true}
            value={value}
            onChangeValue={func}
            valueId={'radioButtonValueId'}
          />
        )
        expect(container.firstElementChild.className).toMatch(
          'disabled-radio-button'
        )
      }
    )
  })

  describe('when receiving label property', () => {
    it('should show label property', () => {
      const { queryByText } = render(
        <RadioButtonComponent
          options={options}
          label={'Test label'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(queryByText('Test label')).toBeInTheDocument()
    })
  })

  describe('when receiving listItemClassName property', () => {
    it('should set className on items', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          listItemClassName={'item-class'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('item-class')
      }
    })

    it(
      'should set className "radio-list-item" on items if listItemClassName ' +
        'not provided',
      () => {
        const { container } = render(
          <RadioButtonComponent
            options={options}
            value={value}
            onChangeValue={func}
            valueId={'radioButtonValueId'}
          />
        )
        for (const element of container.firstElementChild.getElementsByTagName(
          'div'
        )) {
          expect(element.className).toMatch('radio-list-item')
        }
      }
    )
  })

  describe('when receiving labelClassName property', () => {
    it('should set className on labels', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          labelClassName={'label-class'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toMatch(
        'label-class'
      )
    })

    it(
      "should set className 'label' on items if labelClassName " +
        'not provided',
      () => {
        const { container } = render(
          <RadioButtonComponent
            options={options}
            value={value}
            onChangeValue={func}
            valueId={'radioButtonValueId'}
          />
        )
        expect(container.getElementsByTagName('label')[0].className).toMatch(
          'label'
        )
      }
    )
  })

  describe('when receiving error property', () => {
    it('should receive error property and place it below list', () => {
      const { container, getByText } = render(
        <RadioButtonComponent
          options={options}
          label={'Test label'}
          error={'test error'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.firstElementChild.className).toMatch(
        'radio-button-component-error'
      )
      expect(container.firstElementChild.firstElementChild.className).toMatch(
        'label  label-error'
      )
      expect(container.firstChild.lastChild).toBe(getByText('test error'))
    })
  })

  describe('when receiving required property', () => {
    it("should add '*' next to label if true", () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          label={'Test label'}
          required={true}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.firstElementChild.firstElementChild.innerHTML).toContain(
        'Test label*'
      )
    })
  })

  describe('when receiving extraListItemClassName property', () => {
    it('should set className on items - add to listItemClassName', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          extraListItemClassName={'item-class'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('radio-list-item item-class')
      }
    })
  })

  describe('when receiving extraLabelClassName property', () => {
    it('should set className on labels - add to labelClassName', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          extraLabelClassName={'label-class'}
          value={value}
          onChangeValue={func}
          valueId={'radioButtonValueId'}
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toMatch(
        'label label-class'
      )
    })
  })
})

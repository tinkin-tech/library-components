import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CheckboxComponent from './CheckboxComponent'

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

const values = ['id1', 'id2']

describe('Checkbox component tests', () => {
  describe('options property', () => {
    it('should recive options list', () => {
      const { container } = render(<CheckboxComponent options={options} />)
      expect(container.getElementsByTagName('input')).toHaveLength(3)
      expect(container.getElementsByTagName('label')).toHaveLength(3)
    })

    it('should render with empty options', () => {
      const { container } = render(<CheckboxComponent options={[]} />)
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('values property', () => {
    it('should recive values property with checked values', () => {
      const { container } = render(
        <CheckboxComponent options={options} values={values} />
      )
      expect(
        Array.of(...container.getElementsByTagName('input')).filter(
          (element) => element.checked === true
        )
      ).toHaveLength(2)
    })
  })

  describe('onChangeValues property', () => {
    it('should recive onChangeValues property, remove from list if exists', () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          values={values}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(
        Array.of(...container.getElementsByTagName('input')).filter(
          (element) => element.checked === true
        )
      ).toHaveLength(values.length - 1)
      expect(func).toHaveBeenCalledWith(['id2'], 'id1')
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("should recive onChangeValues property, add to list if doesn't exists", () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <CheckboxComponent options={options} onChangeValues={func} />
      )
      fireEvent.click(getByText('label1'))
      expect(
        Array.of(...container.getElementsByTagName('input')).filter(
          (element) => element.checked === true
        )
      ).toHaveLength(1)
      expect(func).toHaveBeenCalledWith(['id1'], 'id1')
      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('disable property', () => {
    it('should not execute onChangeValues when disabled is true', () => {
      const func = jest.fn()
      const { getByText } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          disabled={true}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
    })

    it('should add disabled-checklist class to parent when disabled is true', () => {
      const { container } = render(
        <CheckboxComponent options={options} disabled={true} />
      )
      expect(
        container.getElementsByClassName('disabled-checklist')
      ).toHaveLength(1)
    })
  })

  describe('label property', () => {
    it('should recive label property', () => {
      const { container } = render(
        <CheckboxComponent options={options} label={'Test label'} />
      )
      expect(container.getElementsByTagName('label')[0].innerHTML).toContain(
        'Test label'
      )
    })
  })

  describe('listItemClassName property', () => {
    it('should recive listItemClassName property, set className on items', () => {
      const { container } = render(
        <CheckboxComponent options={options} listItemClassName={'item-class'} />
      )
      expect(container.getElementsByClassName('item-class')).toHaveLength(
        options.length
      )
    })

    it("should set className 'check-list-item' on items if listItemClassName not provided", () => {
      const { container } = render(<CheckboxComponent options={options} />)
      expect(container.getElementsByClassName('check-list-item')).toHaveLength(
        options.length
      )
    })
  })

  describe('labelClassName property', () => {
    it('should recive labelClassName property, set className on labels', () => {
      const { container } = render(
        <CheckboxComponent options={options} labelClassName={'label-class'} />
      )
      expect(container.getElementsByClassName('label-class')).toHaveLength(
        options.length
      )
    })

    it("should set className 'label' on items if labelClassName not provided", () => {
      const { container } = render(<CheckboxComponent options={options} />)
      expect(container.getElementsByClassName('label')).toHaveLength(
        options.length
      )
    })
  })

  describe('error property', () => {
    it('should recive error property and place it below list', () => {
      const { container, getByText } = render(
        <CheckboxComponent options={options} error={'test error'} />
      )
      expect(container.firstChild.lastChild).toBe(getByText('test error'))
    })
  })

  describe('required property', () => {
    it("should recive required property and add '*' next to label if true", () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          label={'Test label'}
          required={true}
        />
      )
      expect(container.getElementsByTagName('label')[0].innerHTML).toContain(
        'Test label*'
      )
    })
  })

  describe('extraListItemClassName property', () => {
    it('should recive extraListItemClassName property, set className on items - add to listItemClassName', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          extraListItemClassName={'item-class'}
        />
      )
      expect(
        container.getElementsByClassName('item-class check-list-item')
      ).toHaveLength(options.length)
    })
  })

  describe('extraLabelClassName property', () => {
    it('should recive extraLabelClassName property, set className on labels - add to labelClassName', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          extraLabelClassName={'label-class'}
        />
      )
      expect(
        container.getElementsByClassName('label-class label')
      ).toHaveLength(options.length)
    })
  })
})

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
      expect(func).toHaveBeenCalledWith(['id2'])
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("should recive onChangeValues property, add to list if doesn't exists", () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <CheckboxComponent options={options} onChangeValues={func} />
      )
      fireEvent.click(getByText('label1'))
      fireEvent.click(getByText('label2'))
      expect(
        Array.of(...container.getElementsByTagName('input')).filter(
          (element) => element.checked === true
        )
      ).toHaveLength(2)
      expect(func).toHaveBeenCalledWith(['id1', 'id2'])
      expect(func).toHaveBeenCalledTimes(2)
    })
  })
})

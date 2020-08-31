import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CheckboxComponent from './CheckboxComponent'

const options = [
  {
    id: 'id1',
    label: 'value1',
  },
  {
    id: 'id2',
    label: 'value2',
  },
  {
    id: 'id3',
    label: 'value3',
  },
]

const values = [
  {
    id: 'id1',
    label: 'value1',
  },
  {
    id: 'id2',
    label: 'value2',
  },
]

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
})

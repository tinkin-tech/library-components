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

describe('Checkbox component tests', () => {
  it('should recive options list', () => {
    const { container } = render(<CheckboxComponent options={options} />)
    expect(container.getElementsByTagName('input')).toHaveLength(3)
    expect(container.getElementsByTagName('label')).toHaveLength(3)
  })
})

import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TabsComponent from './TabsComponent'

const elementList = [
  {
    label: 'label1',
    id: 'id1',
    content: React.createElement('a'),
  },
  {
    label: 'label2',
    id: 'id2',
    content: React.createElement('a'),
  },
  {
    label: 'label3',
    id: 'id3',
    content: React.createElement('a'),
  },
]

describe('render component <DateSelectorComponent />', () => {
  describe('list property', () => {
    it('should recive a list of { label: string, id: string | number, content: React.Component}', () => {
      const { container } = render(<TabsComponent list={elementList} />)
      expect(container.getElementsByTagName('ul')[0].childElementCount).toBe(
        elementList.length
      )
      for (const element of container.getElementsByTagName('li')) {
        expect(element.getElementsByTagName('div')[0].innerHTML).toBe('<a></a>')
      }
    })

    it('should render label inside items', () => {
      const { container } = render(<TabsComponent list={elementList} />)
      for (const element of container.getElementsByTagName('li')) {
        expect(element.getElementsByTagName('label')[0]).toBeInTheDocument()
      }
    })
  })
})

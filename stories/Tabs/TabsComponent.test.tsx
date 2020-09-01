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
      const { container } = render(
        <TabsComponent list={elementList} activeTabId={elementList[0].id} />
      )
      expect(container.getElementsByTagName('ul')[0].childElementCount).toBe(
        elementList.length
      )
    })

    it('should render label inside items', () => {
      const { container } = render(
        <TabsComponent list={elementList} activeTabId={elementList[0].id} />
      )
      for (const element of container.getElementsByTagName('li')) {
        expect(element.getElementsByTagName('label')[0]).toBeInTheDocument()
      }
    })
  })

  describe('activeTabId property', () => {
    it('adds "active-tab" class to tab with activeTabId', () => {
      const { container } = render(
        <TabsComponent list={elementList} activeTabId={elementList[0].id} />
      )
      expect(container.getElementsByClassName('active-tab')[0]).toHaveProperty(
        'id',
        elementList[0].id
      )
    })

    it('adds "active-tab" class to tab with activeTabId, if id doest match, add class to first item', () => {
      const { container } = render(
        <TabsComponent list={elementList} activeTabId={'testId'} />
      )
      expect(container.getElementsByClassName('active-tab')[0]).toHaveProperty(
        'id',
        elementList[0].id
      )
    })
  })
})

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByTagName('ul')[0].childElementCount).toBe(
        elementList.length
      )
    })

    it('should render label inside items', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      for (const element of container.getElementsByTagName('li')) {
        expect(element.getElementsByTagName('label')[0]).toBeInTheDocument()
      }
    })
  })

  describe('activeTabId property', () => {
    it('should recive activeTabId and add "active-tab" class', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByClassName('active-tab')[0]).toHaveProperty(
        'id',
        elementList[0].id
      )
    })

    it('should recive activeTabId and add "active-tab" class, if id doest match, add class to first item', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={'testId'}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByClassName('active-tab')[0]).toHaveProperty(
        'id',
        elementList[0].id
      )
    })
  })

  describe('tabListClassName property', () => {
    it('should recive tabListClassName and add to parent className "tab-list"', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          tabListClassName={'test-class'}
          onChangeTab={jest.fn()}
        />
      )
      expect(
        container.getElementsByClassName('test-class tab-list')
      ).toHaveLength(1)
    })

    it('parent class should be "tab-list" if tabListClassName not recived', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByClassName('tab-list')).toHaveLength(1)
    })
  })

  describe('tabContentClassName property', () => {
    it('should recive tabContentClassName and add to content className "tab-list"', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          tabContentClassName={'test-class'}
          onChangeTab={jest.fn()}
        />
      )
      expect(
        container.getElementsByClassName('test-class tab-content')
      ).toHaveLength(1)
    })

    it('content class should be "tab-list" if tabContentClassName not recived', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByClassName('tab-content')).toHaveLength(1)
    })
  })

  describe('onChangeTab property', () => {
    it('should recive onChangeTab prop and execute when list item clicked', () => {
      const func = jest.fn()
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={func}
        />
      )
      fireEvent.click(container.getElementsByTagName('li')[0])
      expect(func).toHaveBeenCalledTimes(1)
      expect(func).toHaveBeenCalledWith(elementList[0])
    })
  })
})

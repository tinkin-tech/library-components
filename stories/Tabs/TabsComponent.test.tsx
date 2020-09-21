import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TabsComponent from './TabsComponent'

describe('render component <DateSelectorComponent />', () => {
  const elementList = [
    {
      label: 'label1',
      id: 'id1',
      content: <div>Content A</div>,
    },
    {
      label: 'label2',
      id: 'id2',
      content: <div>Content B</div>,
    },
    {
      label: 'label3',
      id: 'id3',
      content: <div>Content C</div>,
    },
  ]

  describe('when reciving list property', () => {
    it(`should recive a list of { label: string, id: string | number, content:
    React.Component}, and render into a list`, () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(
        container.getElementsByTagName('ul')[0].getElementsByTagName('li')
      ).toHaveLength(elementList.length)
    })

    it('should render label inside items', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      elementList.forEach((element, index) => {
        expect(container.getElementsByTagName('li')[index].textContent).toBe(
          element.label
        )
      })
    })
  })

  describe('when reciving activeTabId property', () => {
    it('should add "active-tab" class to activeTabId item', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={'id3'}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByClassName('active-tab')[0]).toHaveProperty(
        'id',
        'id3'
      )
    })

    it(`should add "active-tab" class, if id doest match, add class to
    first item`, () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={'testId'}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByTagName('li')[0]).toHaveProperty(
        'className',
        'active-tab'
      )
    })
  })

  describe('when reciving extraTabListClassName property', () => {
    it(`should add extraTabListClassName and "tab-list" className to
    parent`, () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          extraTabListClassName={'test-class'}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.querySelector('ul').className).toMatch(
        'test-class tab-list'
      )
    })

    it(`should add "tab-list" class to parent if extraTabListClassName not
    recived`, () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.querySelector('ul').className).toMatch('tab-list')
    })
  })

  describe('when reciving tabContentClassName property', () => {
    it('should add tabContentClassName and "tab-list" to content', () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          tabContentClassName={'test-class'}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByTagName('div')[1].className).toMatch(
        'test-class tab-content'
      )
    })

    it(`content class should add class "tab-list" if tabContentClassName not
    recived`, () => {
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={jest.fn()}
        />
      )
      expect(container.getElementsByTagName('div')[1].className).toMatch(
        'tab-content'
      )
    })
  })

  describe('when reciving onChangeTab property', () => {
    it(`should execute onChangeTab when list item clicked, called with the whole
    selected item`, () => {
      const func = jest.fn()
      const { container } = render(
        <TabsComponent
          list={elementList}
          activeTabId={elementList[0].id}
          onChangeTab={func}
        />
      )
      fireEvent.click(container.getElementsByTagName('li')[0].firstElementChild)
      expect(func).toHaveBeenCalledTimes(1)
      expect(func).toHaveBeenCalledWith(elementList[0])
    })
  })
})

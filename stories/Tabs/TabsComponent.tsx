import * as React from 'react'

interface IListItem {
  label: string
  id: string | number
  content: React.ReactElement
}

interface ITabsComponent {
  list: IListItem[]
  activeTabId: string | number
  tabListClassName?: string
}

const TabsComponent = (props: ITabsComponent): React.ReactElement => {
  const { list, activeTabId, tabListClassName } = props
  const activeItem = list.find((item) => item.id === activeTabId)
  const activeId = activeItem ? activeItem.id : list[0].id
  return (
    <>
      <ul className={`${tabListClassName || ''} tab-list`}>
        {list.map((item) => (
          <li
            key={item.id}
            id={item.id.toString()}
            className={item.id === activeId ? 'active-tab' : ''}
          >
            <label>{item.label}</label>
          </li>
        ))}
      </ul>
      <div>{activeItem ? activeItem.content : list[0].content}</div>
    </>
  )
}

export default TabsComponent

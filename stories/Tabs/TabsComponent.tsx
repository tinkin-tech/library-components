import * as React from 'react'

interface IListItem {
  label: string
  id: string | number
  content: React.ReactElement
}

export interface ITabsComponent {
  list: IListItem[]
  activeTabId: string | number
  onChangeTab: (item: IListItem) => void
  extraTabListClassName?: string
  tabContentClassName?: string
}

export const TabsComponent = (props: ITabsComponent): React.ReactElement => {
  const {
    list,
    activeTabId,
    extraTabListClassName,
    tabContentClassName,
    onChangeTab,
  } = props

  const activeItem = list.find((item) => item.id === activeTabId)
  const activeId = activeItem ? activeItem.id : list[0].id
  return (
    <div className="tabs-component">
      <ul className={`${extraTabListClassName || ''} tab-list`}>
        {list.map((item) => (
          <li
            key={item.id}
            id={item.id.toString()}
            className={item.id === activeId ? 'active-tab' : ''}
          >
            <a
              onClick={(): void => {
                onChangeTab(item)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className={`${tabContentClassName || ''} tab-content`}>
        {activeItem ? activeItem.content : list[0].content}
      </div>
    </div>
  )
}

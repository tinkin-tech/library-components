import * as React from 'react'

interface IListItem {
  label: string
  id: string | number
  content: React.ReactElement
}

interface ITabsComponent {
  list: IListItem[]
}

const TabsComponent = (props: ITabsComponent): React.ReactElement => {
  const { list } = props
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <label>{item.label}</label>
          <div>{item.content}</div>
        </li>
      ))}
    </ul>
  )
}

export default TabsComponent

import * as React from 'react'
import TabsComponent, { ITabsComponent } from './TabsComponent'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Tabs',
  component: TabsComponent,
}

const Template = (args: ITabsComponent): React.ReactElement => (
  <TabsComponent {...args} />
)

export const Default: { args: ITabsComponent } = Template.bind({})

Default.args = {
  activeTabId: 'id2',
  list: [
    {
      id: 'id1',
      content: <div>Content 1</div>,
      label: 'Tab 1',
    },
    {
      id: 'id2',
      content: <div>Content 2</div>,
      label: 'Tab 2',
    },
    {
      id: 'id3',
      content: <div>Content 3</div>,
      label: 'Tab 3',
    },
  ],
  onChangeTab: action('onChangeValue'),
}

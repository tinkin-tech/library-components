import * as React from 'react'
import TooltipComponent, { ITooltipComponent } from './TooltipComponent'

export default {
  title: 'Tooltip',
  component: TooltipComponent,
}

const Template = (args: ITooltipComponent): React.ReactElement => (
  <div style={{ marginTop: 100, marginLeft: 200 }}>
    <TooltipComponent {...args} />
  </div>
)

export const Default: { args: ITooltipComponent } = Template.bind({})

const contentDefault = <div>Tooltip text</div>

const childrenDefault = <div>Tooltip Component</div>

Default.args = {
  content: contentDefault,
  maxWidth: 200,
  position: 'topRight',
  containerClassName: '',
  extraContainerClassName: '',
  children: childrenDefault,
}

import * as React from 'react'
import {
  IAccordionComponentProps,
  AccordionComponent,
} from './AccordionComponent'

export default {
  title: 'Accordion Component',
  component: AccordionComponent,
}

const Template = (arg: IAccordionComponentProps): JSX.Element => (
  <AccordionComponent {...arg} />
)

export const Default: { args: IAccordionComponentProps } = Template.bind({})

Default.args = {
  accordionList: [
    {
      content: <span>Content 1</span>,
      openLabel: 'Mostrar menos',
      closeLabel: 'Mostrar más',
    },
    {
      content: <span>Content 2</span>,
      openLabel: 'Mostrar menos',
      closeLabel: 'Mostrar más',
    },
    {
      content: <span>Content 3</span>,
      openLabel: 'Show less',
      closeLabel: 'Show more',
    },
    {
      content: <span>Content 4</span>,
      openLabel: 'Show less',
      closeLabel: 'Show more',
    },
  ],
  defaultKeyOpen: 0,
}

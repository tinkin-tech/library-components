import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AccordionComponent } from './AccordionComponent'

describe('when render <AccordionComponent />', () => {
  const defaultAccordionList = [
    {
      openLabel: 'Show less',
      closeLabel: 'Show more',
      content: <span>Hello</span>,
    },
    { openLabel: 'close', closeLabel: 'open', content: <span>Hello 2</span> },
  ]

  describe('when received default properties', () => {
    it('renders className of first element equal to component name', () => {
      const { container } = render(
        <AccordionComponent
          defaultKeyOpen={0}
          accordionList={defaultAccordionList}
        />
      )
      expect(container.children[0].className).toContain('accordion-component')
    })

    it('renders number of accordion items equal to number passed in prop', () => {
      const accordionList = [
        { openLabel: '', closeLabel: '', content: <span>Hello</span> },
        { openLabel: '', closeLabel: '', content: <span>Hello 2</span> },
        { openLabel: '', closeLabel: '', content: <span>Hello 3</span> },
      ]
      const { container } = render(
        <AccordionComponent defaultKeyOpen={0} accordionList={accordionList} />
      )
      expect(container.getElementsByClassName('accordion-item')).toHaveLength(3)
    })

    it('shows closeLabels of all accodions items when are close', () => {
      const { getByText } = render(
        <AccordionComponent
          defaultKeyOpen={3}
          accordionList={defaultAccordionList}
        />
      )
      expect(getByText('Show more')).toBeTruthy()
      expect(getByText('open')).toBeTruthy()
    })

    it('shows openLabels of all accodions items when are open', () => {
      const { getByText } = render(
        <AccordionComponent
          defaultKeyOpen={0}
          accordionList={defaultAccordionList}
        />
      )
      expect(getByText('Show less')).toBeTruthy()
    })
  })

  describe('when click on label text', () => {
    it('does not show content of accordion item that was clicked when is open', () => {
      const { queryByText } = render(
        <AccordionComponent
          defaultKeyOpen={0}
          accordionList={defaultAccordionList}
        />
      )
      expect(queryByText('Hello')).toBeTruthy()
      fireEvent.click(queryByText('Show less'))
      expect(queryByText('Hello')).toBeNull()
      expect(queryByText('Hello 2')).toBeNull()
    })

    it('add open className on accordion item when is close', () => {
      const { container, queryByText } = render(
        <AccordionComponent
          defaultKeyOpen={0}
          accordionList={defaultAccordionList}
        />
      )
      expect(
        container.querySelectorAll('.accordion-item')[1].className
      ).not.toContain('open')
      fireEvent.click(queryByText('open'))
      expect(
        container.querySelectorAll('.accordion-item')[1].className
      ).toContain('open')
    })

    it('shows content of accordion item that was clicked when is close', () => {
      const { queryByText } = render(
        <AccordionComponent
          defaultKeyOpen={0}
          accordionList={defaultAccordionList}
        />
      )
      fireEvent.click(queryByText('open'))
      expect(queryByText('Hello 2')).toBeTruthy()
    })
  })
})

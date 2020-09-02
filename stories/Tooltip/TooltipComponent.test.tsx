import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TooltipComponent, { IPosition } from './TooltipComponent'
import { mockOffsetAndClientSizes } from '../../utils/testUtils/testUtils'

describe('render component <TooltipComponent />', () => {
  const content = <div>Generic text</div>
  const children = <a>Click test</a>

  describe('When recive children prop', () => {
    it('Should show children content when wrapp any element', () => {
      const { getByText } = render(
        <TooltipComponent content={content}>{children}</TooltipComponent>
      )
      expect(getByText('Click test')).toBeInTheDocument()
    })
  })

  describe('When recive content prop', () => {
    it('Should show content only when hover tooltip component', () => {
      const { container, queryByText } = render(
        <TooltipComponent content={content}>{children}</TooltipComponent>
      )
      expect(queryByText('Generic text')).not.toBeInTheDocument()
      fireEvent.mouseOver(container.getElementsByTagName('div')[0])
      expect(queryByText('Generic text')).toBeInTheDocument()
      fireEvent.mouseLeave(container.getElementsByTagName('div')[0])
      expect(queryByText('Generic text')).not.toBeInTheDocument()
    })
  })

  describe('When recive maxWidth prop', () => {
    it('Should set maxWidth value in styles of container of content', () => {
      const { container } = render(
        <TooltipComponent content={content} maxWidth={100}>
          {children}
        </TooltipComponent>
      )
      fireEvent.mouseOver(container.getElementsByTagName('div')[0])
      const element = container.getElementsByClassName(
        'tooltip-container'
      )[0] as HTMLElement
      expect(element.style.maxWidth).toBe('100px')
    })

    it(
      'Should set maxWidth 200 in styles of container of content when not ' +
        'pass maxWidth',
      () => {
        const { container } = render(
          <TooltipComponent content={content}>{children}</TooltipComponent>
        )
        fireEvent.mouseOver(container.getElementsByTagName('div')[0])
        const element = container.getElementsByClassName(
          'tooltip-container'
        )[0] as HTMLElement
        expect(element.style.maxWidth).toBe('200px')
      }
    )
  })

  describe('When recive containerClassName prop', () => {
    it(
      'Should replace main className of component for containerClassName ' +
        'value',
      () => {
        const { container } = render(
          <TooltipComponent content={content} containerClassName="custom-class">
            {children}
          </TooltipComponent>
        )
        expect(container.getElementsByTagName('div')[0].className).toBe(
          'custom-class'
        )
      }
    )
  })

  describe('When recive position prop', () => {
    mockOffsetAndClientSizes()

    const cases = [
      ['bottom', 'bottom-position'],
      ['left', 'left-position'],
      ['right', 'right-position'],
      ['top', 'top-position'],
      ['bottomLeft', 'bottomLeft-position'],
      ['topLeft', 'topLeft-position'],
    ]

    it.each(cases)(
      'Should pass %p and add %p in className of tooltip-container',
      (position: IPosition, result: string) => {
        const { container } = render(
          <TooltipComponent content={content} position={position}>
            {children}
          </TooltipComponent>
        )
        fireEvent.mouseOver(container.getElementsByTagName('div')[0])
        expect(
          container.getElementsByClassName('tooltip-container')[0].className
        ).toContain(result)
      }
    )

    it('Should set bottom position when not pass position prop', () => {
      const { container } = render(
        <TooltipComponent content={content}>{children}</TooltipComponent>
      )
      fireEvent.mouseOver(container.getElementsByTagName('div')[0])
      expect(
        container.getElementsByClassName('tooltip-container')[0].className
      ).toContain('bottom-position')
    })

    it(
      'Should add marginLeft style with offsetWidth of container content ' +
        'when pass position top or bottom and hover',
      () => {
        const component = (
          <TooltipComponent content={content} position="top">
            {children}
          </TooltipComponent>
        )
        const { container } = render(component)
        fireEvent.mouseOver(container.getElementsByTagName('div')[0])
        const element = container.getElementsByClassName(
          'tooltip-container'
        )[0] as HTMLElement
        expect(element.style.marginLeft).toBe('-250px')
      }
    )

    it(
      'Should add marginTop style with containerHeight of container content ' +
        'when pass position left or right and hover',
      () => {
        const { container } = render(
          <TooltipComponent content={content} position="left">
            {children}
          </TooltipComponent>
        )
        fireEvent.mouseOver(container.getElementsByTagName('div')[0])
        const element = container.getElementsByClassName(
          'tooltip-container'
        )[0] as HTMLDivElement
        expect(element.style.marginTop).toBe('-250px')
      }
    )
  })

  describe('When recive extraContainerClassName prop', () => {
    it('Should add extraContainerClassName value to main className', () => {
      const { container } = render(
        <TooltipComponent
          content={content}
          extraContainerClassName="extra-class"
        >
          {children}
        </TooltipComponent>
      )
      expect(container.getElementsByTagName('div')[0].className).toBe(
        'tooltip-component extra-class'
      )
    })
  })
})

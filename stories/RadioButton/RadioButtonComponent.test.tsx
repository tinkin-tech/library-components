import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RadioButtonComponent from './RadioButtonComponent'

describe('render component <RadioButtonComponent />', () => {
  const options = [
    {
      id: 'id1',
      label: 'label1',
    },
    {
      id: 'id2',
      label: 'label2',
    },
    {
      id: 'id3',
      label: 'label3',
    },
  ]

  const value = 'id1'

  describe('when reciving options property', () => {
    it('should render options list items', () => {
      const { container } = render(<RadioButtonComponent options={options} />)
      expect(container.getElementsByTagName('input')).toHaveLength(3)
      expect(container.getElementsByTagName('label')).toHaveLength(3)
    })

    it('should show any options when list is empty', () => {
      const { container } = render(<RadioButtonComponent options={[]} />)
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('when reciving values property', () => {
    it('should recive values property with checked values', () => {
      const { container } = render(
        <RadioButtonComponent options={options} value={value} />
      )
      expect(
        container.getElementsByClassName('selected')[0].firstElementChild
      ).toHaveAttribute('id', value)
    })
  })

  describe('when reciving onChangeValues property', () => {
    it('should recive new id if different than value and valueId', () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          value={value}
          valueId={'id4'}
        />
      )
      fireEvent.click(getByText('label2'))
      expect(
        Array.of(...container.getElementsByTagName('input')).filter(
          (element) => element.checked === true
        )[0]
      ).toHaveAttribute('id', 'id2')
      expect(func).toHaveBeenCalledWith('id2', 'id4')
      expect(func).toHaveBeenCalledTimes(1)
    })

    it('should do nothing if same id is selected', () => {
      const func = jest.fn()
      const { getByText } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          value={value}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
    })
  })

  describe('when reciving disabled property', () => {
    it('should not execute onChangeValues when disabled is true', () => {
      const func = jest.fn()
      const { getByText } = render(
        <RadioButtonComponent
          options={options}
          onChangeValue={func}
          disabled={true}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
    })

    it('should add disabled-checklist class to parent when disabled is true', () => {
      const { container } = render(
        <RadioButtonComponent options={options} disabled={true} />
      )
      expect(container.firstElementChild.className).toMatch(
        'disabled-checklist'
      )
    })
  })

  describe('when reciving label property', () => {
    it('should recive label property', () => {
      const { container } = render(
        <RadioButtonComponent options={options} label={'Test label'} />
      )
      expect(container.firstElementChild.firstElementChild.tagName).toBe(
        'LABEL'
      )
    })

    it('should not render label on top if label not recived', () => {
      const { container } = render(<RadioButtonComponent options={options} />)
      expect(container.firstElementChild.firstElementChild.tagName).not.toBe(
        'LABEL'
      )
    })
  })

  describe('when reciving listItemClassName property', () => {
    it('should set className on items', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          listItemClassName={'item-class'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('item-class')
      }
    })

    it("should set className 'check-list-item' on items if listItemClassName not provided", () => {
      const { container } = render(<RadioButtonComponent options={options} />)
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('check-list-item')
      }
    })
  })

  describe('when reciving labelClassName property', () => {
    it('should set className on labels', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          labelClassName={'label-class'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.getElementsByTagName('label')[0].className).toMatch(
          'label-class'
        )
      }
    })

    it("should set className 'label' on items if labelClassName not provided", () => {
      const { container } = render(<RadioButtonComponent options={options} />)
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.getElementsByTagName('label')[0].className).toMatch(
          'label'
        )
      }
    })
  })

  describe('when reciving error property', () => {
    it('should recive error property and place it below list', () => {
      const { container, getByText } = render(
        <RadioButtonComponent options={options} error={'test error'} />
      )
      expect(container.firstChild.lastChild).toBe(getByText('test error'))
    })
  })

  describe('when reciving required property', () => {
    it("should add '*' next to label if true", () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          label={'Test label'}
          required={true}
        />
      )
      expect(container.firstElementChild.firstElementChild.innerHTML).toContain(
        'Test label*'
      )
    })
  })

  describe('when reciving extraListItemClassName property', () => {
    it('should set className on items - add to listItemClassName', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          extraListItemClassName={'item-class'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('check-list-item item-class')
      }
    })
  })

  describe('when reciving extraLabelClassName property', () => {
    it('should set className on labels - add to labelClassName', () => {
      const { container } = render(
        <RadioButtonComponent
          options={options}
          extraLabelClassName={'label-class'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.getElementsByTagName('label')[0].className).toMatch(
          'label label-class'
        )
      }
    })
  })
})

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CheckboxComponent from './CheckboxComponent'

describe('render component <CheckboxComponent />', () => {
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

  const values = ['id1', 'id2']

  describe('when reciving options property', () => {
    it('should render options list items', () => {
      const { container } = render(<CheckboxComponent options={options} />)
      expect(container.getElementsByTagName('input')).toHaveLength(3)
      expect(container.getElementsByTagName('label')).toHaveLength(3)
    })

    it('shouldnt show any options when list is empty', () => {
      const { container } = render(<CheckboxComponent options={[]} />)
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('when reciving values property', () => {
    it('should add selected class to items with values ids', () => {
      const { container } = render(
        <CheckboxComponent options={options} values={values} />
      )
      values.forEach((value, index) => {
        expect(
          container
            .getElementsByClassName('selected')
            [index].getElementsByTagName('input')[0].id
        ).toBe(value)
      })
    })
  })

  describe('when reciving onChangeValues property', () => {
    it('should recive onChangeValues property, remove from list if exists', () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          values={values}
          valueId={'id3'}
        />
      )
      fireEvent.click(getByText('label1'))
      for (const element of container.getElementsByClassName('selected')) {
        expect(element.getElementsByTagName('input')[0].id).not.toBe('id1')
      }
      expect(func).toHaveBeenCalledWith(['id2'], 'id3')
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("should recive onChangeValues property, add to list if doesn't exists", () => {
      const func = jest.fn()
      const { getByText, container } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          values={values}
          valueId={'id4'}
        />
      )
      fireEvent.click(getByText('label3'))
      const newValues = [...values, 'id3']
      newValues.forEach((value, index) => {
        expect(
          container
            .getElementsByClassName('selected')
            [index].getElementsByTagName('input')[0].id
        ).toBe(value)
      })
      expect(func).toHaveBeenCalledWith(newValues, 'id4')
      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('when reciving disable property', () => {
    it('should not execute onChangeValues when disabled is true', () => {
      const func = jest.fn()
      const { getByText } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          disabled={true}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
    })

    it('should add disabled-checklist class to parent when disabled is true', () => {
      const { container } = render(
        <CheckboxComponent options={options} disabled={true} />
      )
      expect(container.firstElementChild.className).toMatch(
        'disabled-checklist'
      )
    })
  })

  describe('when reciving label property', () => {
    it('should recive label property and render label over list with label className', () => {
      const { container } = render(
        <CheckboxComponent options={options} label={'Test label'} />
      )
      expect(container.getElementsByTagName('label')[0].innerHTML).toContain(
        'Test label'
      )
    })

    it('should not render label on top if label not recived', () => {
      const { container } = render(<CheckboxComponent options={options} />)
      expect(container.firstElementChild.firstElementChild.tagName).not.toBe(
        'LABEL'
      )
    })
  })

  describe('when reciving listItemClassName property', () => {
    it('should set listItemClassName className on items', () => {
      const { container } = render(
        <CheckboxComponent options={options} listItemClassName={'item-class'} />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('item-class')
      }
    })

    it("should set className 'check-list-item' on items if listItemClassName not provided", () => {
      const { container } = render(<CheckboxComponent options={options} />)
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
        <CheckboxComponent options={options} labelClassName={'label-class'} />
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
      const { container } = render(<CheckboxComponent options={options} />)
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
    it('should render error below list', () => {
      const { container, getByText } = render(
        <CheckboxComponent options={options} error={'test error'} />
      )
      expect(container.firstChild.lastChild).toBe(getByText('test error'))
    })
  })

  describe('when reciving required property', () => {
    it("should add '*' next to label if true", () => {
      const { container } = render(
        <CheckboxComponent
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
        <CheckboxComponent
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
        <CheckboxComponent
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

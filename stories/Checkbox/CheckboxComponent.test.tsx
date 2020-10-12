import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { CheckboxComponent } from './CheckboxComponent'

describe('render component <CheckboxComponent />', () => {
  const func = jest.fn()
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

  describe('when receiving options property', () => {
    it('should render options list items', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(3)
      expect(container.getElementsByTagName('label')).toHaveLength(3)
    })

    it('shouldnt show any options when list is empty', () => {
      const { container } = render(
        <CheckboxComponent
          options={[]}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('label')).toHaveLength(0)
    })
  })

  describe('when receiving values property', () => {
    it('should add selected class to items with values ids', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
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

  describe('when receiving onChangeValues property', () => {
    it('should remove from list if element selected exists in list', () => {
      const { getByText } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          values={['id1', 'id2']}
          valueId={'checkboxValueId'}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledWith(['id2'], 'checkboxValueId')
      expect(func).toHaveBeenCalledTimes(1)
      jest.clearAllMocks()
    })

    it("should add to list if element selected doesn't exists in list", () => {
      const { getByText } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          values={values}
          valueId={'checkboxValueId'}
        />
      )
      fireEvent.click(getByText('label3'))
      const newValues = [...values, 'id3']
      expect(func).toHaveBeenCalledWith(newValues, 'checkboxValueId')
      expect(func).toHaveBeenCalledTimes(1)
      jest.clearAllMocks()
    })
  })

  describe('when receiving disable property', () => {
    it('should not execute onChangeValues when disabled is true', () => {
      const { getByText } = render(
        <CheckboxComponent
          options={options}
          onChangeValues={func}
          disabled={true}
          values={values}
          valueId={'checkboxValueId'}
        />
      )
      fireEvent.click(getByText('label1'))
      expect(func).toHaveBeenCalledTimes(0)
      jest.clearAllMocks()
    })

    it(
      'should add disabled-checklist class to parent when disabled is ' +
        'true',
      () => {
        const { container } = render(
          <CheckboxComponent
            options={options}
            disabled={true}
            values={values}
            onChangeValues={func}
            valueId={'checkboxValueId'}
          />
        )
        expect(container.firstElementChild.className).toMatch(
          'disabled-checklist'
        )
      }
    )
  })

  describe('when receiving label property', () => {
    it('should render label over list with className "label"', () => {
      const { queryByText } = render(
        <CheckboxComponent
          options={options}
          label={'Test label'}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(queryByText('Test label')).toBeInTheDocument()
    })

    it('should not render label on top if label not received', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(container.firstElementChild.firstElementChild.tagName).not.toBe(
        'label'
      )
    })
  })

  describe('when receiving listItemClassName property', () => {
    it('should set listItemClassName className on items', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          listItemClassName={'item-class'}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('item-class')
      }
    })

    it(
      'should set className check-list-item on items if listItemClassName ' +
        'not provided',
      () => {
        const { container } = render(
          <CheckboxComponent
            options={options}
            values={values}
            onChangeValues={func}
            valueId={'checkboxValueId'}
          />
        )
        for (const element of container.firstElementChild.getElementsByTagName(
          'div'
        )) {
          expect(element.className).toMatch('check-list-item')
        }
      }
    )
  })

  describe('when receiving labelClassName property', () => {
    it('should set className on labels', () => {
      const { queryByText } = render(
        <CheckboxComponent
          options={options}
          label={'Test Label'}
          labelClassName={'label-class'}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(queryByText('Test Label').className).toMatch('label-class')
    })

    it(
      'should set className "label" on items if labelClassName not ' +
        'provided',
      () => {
        const { queryByText } = render(
          <CheckboxComponent
            options={options}
            label={'Test Label'}
            values={values}
            onChangeValues={func}
            valueId={'checkboxValueId'}
          />
        )
        expect(queryByText('Test Label').className).toMatch('label')
      }
    )
  })

  describe('when receiving error property', () => {
    it(
      'should render error below list, add className "label-error" to ' +
        'label and "checkbox-component-error" to}',
      () => {
        const { container, getByText } = render(
          <CheckboxComponent
            options={options}
            label={'Test Label'}
            error={'test error'}
            values={values}
            onChangeValues={func}
            valueId={'checkboxValueId'}
          />
        )
        expect(container.firstElementChild.className).toMatch(
          'checkbox-component-error'
        )
        expect(container.firstElementChild.firstElementChild.className).toMatch(
          'label  label-error'
        )
        expect(container.firstChild.lastChild).toBe(getByText('test error'))
      }
    )
  })

  describe('when receiving required property', () => {
    it("should add '*' next to label if true", () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          label={'Test label'}
          required={true}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(container.firstElementChild.firstElementChild.innerHTML).toContain(
        'Test label*'
      )
    })
  })

  describe('when receiving extraListItemClassName property', () => {
    it('should set className on items - add to listItemClassName', () => {
      const { container } = render(
        <CheckboxComponent
          options={options}
          extraListItemClassName={'item-class'}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      for (const element of container.firstElementChild.getElementsByTagName(
        'div'
      )) {
        expect(element.className).toMatch('check-list-item item-class')
      }
    })
  })

  describe('when receiving extraLabelClassName property', () => {
    it('should set className on labels - add to labelClassName', () => {
      const { queryByText } = render(
        <CheckboxComponent
          options={options}
          label={'Test Label'}
          extraLabelClassName={'label-class'}
          values={values}
          onChangeValues={func}
          valueId={'checkboxValueId'}
        />
      )
      expect(queryByText('Test Label').className).toMatch('label label-class')
    })
  })
})

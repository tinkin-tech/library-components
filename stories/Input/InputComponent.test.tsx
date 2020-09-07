import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InputComponent from './InputComponent'
import { TestUtil } from '../../utils/testUtils/testUtils'

describe('InputComponent test', () => {
  const mockOnChangeInput = jest.fn()

  describe('Value prop', () => {
    it('Should recive value, set in input value', () => {
      const { container } = render(
        <InputComponent
          valueId="input"
          value="generic input value"
          onChangeValue={mockOnChangeInput}
          type="text"
        />
      )
      expect(container.getElementsByTagName('input')[0].value).toBe(
        'generic input value'
      )
    })
  })

  describe('onChangeInput prop', () => {
    it(
      'Should onChangeInput called with input value and valueId, when change ' +
        'input value',
      () => {
        const { container } = render(
          <InputComponent
            valueId="input"
            value=""
            onChangeValue={mockOnChangeInput}
            type="text"
          />
        )
        fireEvent.change(container.getElementsByTagName('input')[0], {
          target: {
            value: 'input value',
          },
        })
        expect(mockOnChangeInput).toHaveBeenCalledTimes(1)
        expect(mockOnChangeInput).toHaveBeenCalledWith('input value', 'input')
      }
    )

    it('Should change input value', () => {
      const mockUtil = new TestUtil()
      const { container, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockUtil.mockedFunction}
          type="text"
        />
      )
      expect(container.getElementsByTagName('input')[0]).toMatchObject({
        value: '',
      })
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: {
          value: 'hello world',
        },
      })
      rerender(
        <InputComponent
          valueId="input"
          value={mockUtil.getValue()}
          onChangeValue={mockUtil.mockedFunction}
          type="text"
        />
      )
      expect(container.getElementsByTagName('input')[0]).toMatchObject({
        value: 'hello world',
      })
    })
  })

  describe('Type prop', () => {
    it('Should change value if enter only numbers, when type is number', () => {
      const mockUtil = new TestUtil()
      const { container, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockUtil.mockedFunction}
          type="number"
        />
      )
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: {
          value: 'uhtn123',
        },
      })
      rerender(
        <InputComponent
          valueId="input"
          value={mockUtil.getValue()}
          onChangeValue={mockUtil.mockedFunction}
          type="number"
        />
      )
      expect(container.getElementsByTagName('input')[0]).toMatchObject({
        value: '123',
      })
    })
  })

  describe('label prop', () => {
    it('Should recive label prop and show in component', () => {
      const { getByText } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          label="label input"
        />
      )
      expect(getByText('label input')).toBeInTheDocument()
    })
  })

  describe('required prop', () => {
    it('Should recive required prop and add "*" in label text', () => {
      const { getByText, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          label="My input"
        />
      )
      expect(getByText('My input').textContent).not.toContain('*')
      rerender(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          label="My input"
          required={true}
        />
      )
      expect(getByText('My input*')).toBeInTheDocument()
    })
  })

  describe('placeholder prop', () => {
    it('Should recive placeholder prop and set in placeholder input', () => {
      const { container } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          placeholder="ej: input"
        />
      )
      expect(container.getElementsByTagName('input')[0].placeholder).toBe(
        'ej: input'
      )
    })

    it(
      'Should set in placeholder default value when not recive placeholder' +
        'prop',
      () => {
        const { container } = render(
          <InputComponent
            valueId="input"
            value=""
            onChangeValue={mockOnChangeInput}
            type="text"
          />
        )
        expect(container.getElementsByTagName('input')[0].placeholder).toBe(
          'Ingresa un texto'
        )
      }
    )
  })

  describe('Error prop', () => {
    it(
      'Should recive error prop, render in component and set "warning"' +
        ' in className',
      () => {
        const { container, rerender, getByText } = render(
          <InputComponent
            valueId="input"
            value=""
            onChangeValue={mockOnChangeInput}
            type="text"
            label="Label"
          />
        )
        expect(container.getElementsByTagName('label')[0].className).toBe(
          'label'
        )
        rerender(
          <InputComponent
            valueId="input"
            value=""
            onChangeValue={mockOnChangeInput}
            type="text"
            error="error del input"
            label="Label"
          />
        )
        expect(container.getElementsByTagName('label')[0].className).toBe(
          'label warning'
        )
        expect(getByText('error del input')).toBeInTheDocument()
        expect(container.getElementsByTagName('input')[0].className).toBe(
          ' warning'
        )
      }
    )
  })

  describe('labelClassName prop', () => {
    it('Should recive labelClassName and replace label className', () => {
      const { container, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          label="Label"
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toBe('label')
      rerender(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          label="Label"
          labelClassName="custom-className"
        />
      )
      expect(container.getElementsByTagName('label')[0].className).toBe(
        'custom-className'
      )
    })
  })

  describe('inputClassName prop', () => {
    it('Should recive inputClassName and replace input className', () => {
      const { container, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
        />
      )
      expect(container.getElementsByTagName('input')[0].className).toBe(' ')
      rerender(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          inputClassName="custom-inputClassName"
        />
      )
      expect(container.getElementsByTagName('input')[0].className).toBe(
        'custom-inputClassName '
      )
    })
  })

  describe('readOnly prop', () => {
    it(
      'Should recive readOnly and not change input value and add disabled ' +
        'className to label',
      () => {
        const mockUtil = new TestUtil()
        const { container, rerender } = render(
          <InputComponent
            valueId="input"
            value=""
            onChangeValue={mockUtil.mockedFunction}
            type="text"
            readOnly={true}
            label="Input"
          />
        )
        expect(container.getElementsByTagName('input')[0].value).toBe('')
        fireEvent.change(container.getElementsByTagName('input')[0], {
          target: {
            value: 'change',
          },
        })
        rerender(
          <InputComponent
            valueId="input"
            value={mockUtil.getValue()}
            onChangeValue={mockUtil.mockedFunction}
            type="text"
            inputClassName="custom-inputClassName"
            label="Input"
            readOnly={true}
          />
        )
        expect(container.getElementsByTagName('input')[0].value).toBe('')
        expect(container.getElementsByTagName('label')[0].className).toContain(
          'disable'
        )
      }
    )
  })

  describe('textArea prop', () => {
    it('Should recive textArea prop and render textArea', () => {
      const { container, rerender } = render(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(1)
      rerender(
        <InputComponent
          valueId="input"
          value=""
          onChangeValue={mockOnChangeInput}
          type="text"
          inputClassName="custom-inputClassName"
          textArea={true}
        />
      )
      expect(container.getElementsByTagName('input')).toHaveLength(0)
      expect(container.getElementsByTagName('textarea')).toHaveLength(1)
    })
  })
})

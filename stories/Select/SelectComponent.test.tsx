import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SelectComponent from './SelectComponent'

describe('SelectComponent tests', () => {
  const mockedFunction = jest.fn()
  const optionsMock = [
    { id: '1', value: 'value-1' },
    { id: '2', value: 'value-2' },
    { id: '3', value: 'value-3' },
  ]

  it('Should render SelectComponet with all props', () => {
    const { container } = render(
      <SelectComponent
        options={[]}
        valueId="selectComponent"
        onChangeValue={mockedFunction}
        value="1"
        placeholder="Select"
        label="Selector"
        error="error"
        required={false}
        readOnly={false}
        labelClassName="custom-label-class-name"
        selectClassName="custom-select-class-name"
        extraLabelClassName=""
        extraSelectClassName=""
      />
    )
    expect(container).toBeInTheDocument()
  })

  describe('Recibe options prop', () => {
    it('Should show list of options when click in the component', () => {
      const { container, getByText } = render(
        <SelectComponent
          options={optionsMock}
          valueId="selectComponent"
          onChangeValue={mockedFunction}
          value="1"
        />
      )
      expect(container.querySelectorAll('li')).toHaveLength(0)
      fireEvent.click(getByText('value-1'))
      expect(container.querySelectorAll('li')).toHaveLength(3)
    })

    it('Should close options list when select an item', () => {
      const { container, getByText } = render(
        <SelectComponent
          options={optionsMock}
          valueId="select"
          value=""
          onChangeValue={mockedFunction}
        />
      )
      fireEvent.click(getByText('Seleccione una opción'))
      fireEvent.click(container.getElementsByTagName('a')[1])
      expect(container.getElementsByTagName('li')).toHaveLength(0)
    })

    it('Should close options when click outside component', () => {
      const { getByText, container } = render(
        <SelectComponent
          options={optionsMock}
          valueId="select"
          value=""
          onChangeValue={mockedFunction}
        />
      )
      fireEvent.click(getByText('Seleccione una opción'))
      fireEvent.click(document)
      expect(container.getElementsByTagName('li')).toHaveLength(0)
    })
  })

  describe('Recive onChangeValue prop', () => {
    it(
      'Should call with item id and valueId prop when select an item of ' +
        'options list',
      () => {
        const { container } = render(
          <SelectComponent
            options={optionsMock}
            value=""
            valueId="select-component"
            onChangeValue={mockedFunction}
          />
        )
        fireEvent.click(container.getElementsByTagName('a')[0])
        fireEvent.click(container.getElementsByTagName('a')[2])
        expect(mockedFunction).toHaveBeenCalledWith('2', 'select-component')
      }
    )
  })

  describe('Recive value prop', () => {
    it('Should show value in component when is not empty or null', () => {
      const { getByText } = render(
        <SelectComponent
          value="1"
          onChangeValue={mockedFunction}
          valueId="select"
          options={optionsMock}
        />
      )
      expect(getByText('value-1')).toBeInTheDocument()
    })

    it(
      'Should add "selected" className on item of options when item id is' +
        ' equal to value',
      () => {
        const { container, getByText } = render(
          <SelectComponent
            value="2"
            onChangeValue={mockedFunction}
            valueId="select"
            options={optionsMock}
          />
        )
        fireEvent.click(getByText('value-2'))
        expect(container.getElementsByTagName('a')[2].className).toBe(
          'selected'
        )
      }
    )
  })

  describe('Recive placeholder prop', () => {
    it('Should show placeholder when value is empty or null', () => {
      const { getByText } = render(
        <SelectComponent
          value=""
          options={optionsMock}
          valueId=""
          onChangeValue={mockedFunction}
          placeholder="Selector placeholder"
        />
      )
      expect(getByText('Selector placeholder')).toBeInTheDocument()
    })

    it(
      'Should show default text "Seleccione una opción" when value and ' +
        ' placeholder are empty or null',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            placeholder=""
          />
        )
        expect(getByText('Seleccione una opción')).toBeInTheDocument()
      }
    )
  })

  describe('Recive label prop', () => {
    it('Should show label text when pass label prop', () => {
      const { getByText } = render(
        <SelectComponent
          value=""
          options={optionsMock}
          valueId=""
          onChangeValue={mockedFunction}
          label="Label Select"
        />
      )
      expect(getByText('Label Select')).toBeInTheDocument()
    })
  })

  describe('Recive error prop', () => {
    it(
      'Should show error message below of component when recive error ' +
        'prop',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            error="error message for select"
          />
        )
        expect(getByText('error message for select')).toBeInTheDocument()
      }
    )

    it(
      'Should add "label-error" in label className and ' +
        '"select-component-error" when pass error prop',
      () => {
        const { getByText, container } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            error="error message for select"
          />
        )
        expect(getByText('Seleccione una opción').className).toContain(
          'select-component-error'
        )
        expect(container.getElementsByTagName('span')[0].className).toContain(
          'label-error'
        )
      }
    )
  })

  describe('Recive required prop', () => {
    it('Should add * next to the label when recive required prop', () => {
      const { getByText } = render(
        <SelectComponent
          onChangeValue={mockedFunction}
          options={optionsMock}
          value=""
          valueId=""
          label="Select Component"
          required={true}
        />
      )
      expect(getByText('Select Component*')).toBeInTheDocument()
    })
  })

  describe('Recive readOnly prop', () => {
    it(
      'Should not show optins list after click on "Seleccione una opción" ' +
        'when recive readOnly prop',
      () => {
        const { getByText, container } = render(
          <SelectComponent
            onChangeValue={mockedFunction}
            value=""
            valueId=""
            options={optionsMock}
            readOnly={true}
          />
        )
        fireEvent.click(getByText('Seleccione una opción'))
        expect(container.getElementsByTagName('li')).toHaveLength(0)
      }
    )

    it(
      'Should add "disable-select" to className of select when recive ' +
        'readOnly prop',
      () => {
        const { getByText } = render(
          <SelectComponent
            onChangeValue={mockedFunction}
            value="1"
            valueId=""
            options={optionsMock}
            readOnly={true}
          />
        )
        expect(getByText('value-1').className).toContain('disable-select')
      }
    )
  })

  describe('Recive labelClassName prop', () => {
    it(
      'Should replace className of label with text passed in ' +
        'labelClassName',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            label="Label"
            labelClassName="custom-label-className"
          />
        )
        expect(getByText('Label').className).not.toContain('label ')
        expect(getByText('Label').className).toContain('custom-label-className')
      }
    )
  })

  describe('Recive selectClassName prop', () => {
    it(
      'Should replace className of select with text of selectClassName ' +
        'prop',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            label="Label"
            selectClassName="custom-select-className"
          />
        )
        expect(getByText('Seleccione una opción').className).not.toContain(
          'select-component'
        )
        expect(getByText('Seleccione una opción').className).toContain(
          'custom-select-className'
        )
      }
    )
  })

  describe('Recive extraLabelClassName prop', () => {
    it(
      'Should add text of extraLabelClassName next to className of label ' +
        'when pass extraLabelClassName prop',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            label="Label"
            extraLabelClassName="extra-label-className"
          />
        )
        expect(getByText('Label').className).toContain('extra-label-className')
      }
    )
  })

  describe('Recive extraSelectClassName prop', () => {
    it(
      'Should add text of extraSelectClassName next to className of select ' +
        'when pass extraSelectClassName prop',
      () => {
        const { getByText } = render(
          <SelectComponent
            value=""
            options={optionsMock}
            valueId=""
            onChangeValue={mockedFunction}
            extraSelectClassName="extra-select-className"
          />
        )
        expect(getByText('Seleccione una opción').className).toContain(
          'extra-select-className'
        )
      }
    )
  })
})

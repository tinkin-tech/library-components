import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { DropdownContentComponent } from './DropdownContentComponent'

describe('Render component <DropdownContentComponent />', () => {
  const mockedFunction = jest.fn()
  const optionsMock = [
    {
      id: 1,
      label: 'Option 1',
    },
    {
      id: 2,
      label: 'Option 2',
    },
    {
      id: 3,
      label: 'Option 3',
    },
    {
      id: 4,
      label: 'Option 4',
    },
  ]

  describe('When receive default prop', () => {
    it('Should show button text and class name same to component', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
        />
      )
      expect(container.firstElementChild.className).toContain(
        'drop-down-content-component'
      )
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
      expect(queryByText('Label Button')).toBeInTheDocument()
    })

    it('Should handle open and close options', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
        />
      )
      fireEvent.click(queryByText('Label Button'))
      expect(
        container.querySelector('.drop-down-container')
      ).toBeInTheDocument()
      expect(queryByText('Option 1')).toBeInTheDocument()
      expect(container.querySelectorAll('li')).toHaveLength(4)
      fireEvent.click(container.querySelector('.close-icon'))
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
      fireEvent.click(queryByText('Label Button'))
      expect(
        container.querySelector('.drop-down-container')
      ).toBeInTheDocument()
      fireEvent.click(document)
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
    })

    it('Should preselect options', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Option 3'))
      expect(queryByText('Option 3').className).toContain('active')
      fireEvent.click(queryByText('Option 1'))
      expect(queryByText('Option 1').className).toContain('active')
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(1)
      expect(container.querySelectorAll('.option-icon')[0].className).toContain(
        'checkbox'
      )
      fireEvent.click(queryByText('Option 1'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(0)
    })
  })

  describe('When receive clearAction and clearLabel prop', () => {
    it('Should show clear label and call to clear action', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          clearAction={mockedFunction}
          clearLabel="Label Clear"
        />
      )
      fireEvent.click(queryByText('Label Button'))
      expect(queryByText('Label Clear')).toBeInTheDocument()
      fireEvent.click(queryByText('Option 3'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(1)
      fireEvent.click(queryByText('Label Clear'))
      expect(mockedFunction).toHaveBeenCalled()
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(0)
    })

    it('Should close options when receive closeOnClear', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          clearAction={mockedFunction}
          clearLabel="Label Clear"
          closeOnClear={true}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Label Clear'))
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
    })

    it('Should show call to clear action and clear multiple selection', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          clearAction={mockedFunction}
          clearLabel="Label Clear"
          multipleOptionSelect={true}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Option 3'))
      fireEvent.click(queryByText('Option 1'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(2)
      fireEvent.click(queryByText('Label Clear'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(0)
    })
  })

  describe('When receive applyAction and applyLabel prop', () => {
    it('Should show apply label and call to apply action', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          applyAction={mockedFunction}
          applyLabel="Label Apply"
        />
      )
      fireEvent.click(queryByText('Label Button'))
      expect(queryByText('Label Apply')).toBeInTheDocument()
      fireEvent.click(queryByText('Option 3'))
      fireEvent.click(queryByText('Label Apply'))
      expect(mockedFunction).toHaveBeenCalledWith(3)
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
    })
  })

  describe('When receive multipleOptionSelect prop', () => {
    it('Should show apply label and call to apply action', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          multipleOptionSelect={true}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Option 1'))
      expect(queryByText('Option 1').className).toContain('active')
      fireEvent.click(queryByText('Option 4'))
      expect(queryByText('Option 4').className).toContain('active')
      fireEvent.click(queryByText('Option 2'))
      expect(queryByText('Option 2').className).toContain('active')
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(3)
      fireEvent.click(queryByText('Option 2'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(2)
      expect(queryByText('Option 2').className).not.toContain('active')
    })
  })

  describe('When receive onSelectOption prop', () => {
    it('Should call to onSelectOption when click on option', () => {
      const { queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          onSelectOption={mockedFunction}
          multipleOptionSelect={true}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Option 1'))
      expect(mockedFunction).toHaveBeenCalledWith([1])
      fireEvent.click(queryByText('Option 4'))
      expect(mockedFunction).toHaveBeenCalledWith([1, 4])
    })

    it('Should close options if have closeOnSelect prop', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          onSelectOption={mockedFunction}
          multipleOptionSelect={true}
          closeOnSelect={true}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      fireEvent.click(queryByText('Option 1'))
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
    })
  })

  describe('When receive optionValues prop', () => {
    it('Should preselect option includes on optionValues', () => {
      const { container, queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          buttonLabel="Label Button"
          multipleOptionSelect={true}
          optionValues={[2, 4]}
        />
      )
      fireEvent.click(queryByText('Label Button'))
      expect(queryByText('Option 2').className).toContain('active')
      expect(queryByText('Option 4').className).toContain('active')
      fireEvent.click(queryByText('Option 1'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(3)
      fireEvent.click(queryByText('Label Button'))
      expect(
        container.querySelector('.drop-down-container')
      ).not.toBeInTheDocument()
      fireEvent.click(queryByText('Label Button'))
      expect(
        container.querySelectorAll('.drop-down-option.active')
      ).toHaveLength(2)
    })
  })

  describe('When receive customButton', () => {
    it('Should show custom button', () => {
      const { queryByText } = render(
        <DropdownContentComponent
          dropDownContent={optionsMock}
          customButton={<div>Demo Custom</div>}
        />
      )
      expect(queryByText('Demo Custom')).toBeInTheDocument()
    })
  })

  describe('When receive JSX options', () => {
    it('Should show option html content', () => {
      const { queryByText } = render(
        <DropdownContentComponent
          dropDownContent={<div>Demo Options</div>}
          buttonLabel="Label Button"
        />
      )
      fireEvent.click(queryByText('Label Button'))
      expect(queryByText('Demo Options')).toBeInTheDocument()
    })
  })
})

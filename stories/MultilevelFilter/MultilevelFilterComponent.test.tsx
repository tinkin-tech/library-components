import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MultilevelFilterComponent from './MultilevelFilterComponent'

describe('render component <MultilevelFilterComponent />', () => {
  const mockOptions = [
    {
      id: '1',
      label: 'Filter 1',
      children: [
        {
          id: '1-1',
          label: 'Filter 1 1',
          children: [
            {
              id: '1-1-1',
              label: 'Filter 1 1 1',
            },
            {
              id: '1-1-2',
              label: 'Filter 1 1 2',
            },
          ],
        },
        {
          id: '1-2',
          label: 'Filter 1 2',
        },
      ],
    },
    {
      id: '2',
      label: 'Filter 2',
    },
    {
      id: '3',
      label: 'Filter 3',
      children: [
        {
          id: '3-1-1',
          label: 'Filter 3 1 1',
        },
        {
          id: '3-1-2',
          label: 'Filter 3 1 2',
        },
        {
          id: '3-1-3',
          label: 'Filter 3 1 3',
        },
      ],
      notSelectable: true,
    },
    {
      id: '4',
      label: 'Filter 4',
      children: [],
    },
  ]

  const mockOnChange = jest.fn()

  describe('when receive placeholder prop', () => {
    it('should show placeholder text when exist prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          placeholder="select items"
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      expect(getByText('select items')).toBeInTheDocument()
    })

    it('should show default text "Filtrar" when no exist prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      expect(getByText('Filtrar')).toBeInTheDocument()
    })
  })

  describe('when receive options prop', () => {
    it('should show list when click on "filtrar" and first level contains class list-level-0', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      expect(container.querySelectorAll('ul')).toHaveLength(0)
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelectorAll('ul')[0].className).toContain(
        'list-level-0 option-list'
      )
    })

    it('should show list of first level options when click on "Filtrar"', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      expect(container.querySelectorAll('ul.list-level-0 > li')).toHaveLength(0)
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelectorAll('ul.list-level-0 > li')).toHaveLength(4)
    })

    it('should show list of child recursive on level option when click on "Filtrar"', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      expect(container.querySelectorAll('ul.list-level-0 li')).toHaveLength(0)
      fireEvent.click(getByText('Filtrar'))
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[0]
          .querySelector('ul').children
      ).toHaveLength(2)
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[0]
          .querySelector('ul')
          .children[0].querySelector('ul').children
      ).toHaveLength(2)
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[1]
          .querySelectorAll('ul li')
      ).toHaveLength(0)
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[2]
          .querySelector('ul').children
      ).toHaveLength(3)
    })

    it('should every child contains class list-level-(nesting level)', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[0]
          .querySelector('ul').className
      ).toContain('list-level-1')
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[0]
          .querySelector('ul')
          .children[0].querySelector('ul').className
      ).toContain('list-level-2')
    })

    it('should show list itenm label', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(getByText('Filter 1')).toBeInTheDocument()
      expect(getByText('Filter 1 1')).toBeInTheDocument()
      expect(getByText('Filter 1 1 2')).toBeInTheDocument()
    })

    it('should hide list when press on item label and not have prop notSelectable', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      fireEvent.click(getByText('Filter 3'))
      expect(container.querySelectorAll('ul')).not.toHaveLength(0)
      fireEvent.click(getByText('Filter 1'))
      expect(container.querySelectorAll('ul')).toHaveLength(0)
    })

    it('Should close list when click outside component', () => {
      const { getByText, container } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      fireEvent.click(document)
      expect(container.querySelectorAll('ul')).toHaveLength(0)
    })

    it('Should add class to itemList in dependence of notSelectable prop', () => {
      const { getByText, container } = render(
        <MultilevelFilterComponent
          onChangeValue={mockOnChange}
          options={mockOptions}
          values={[]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(
        container.querySelectorAll('ul.list-level-0 > li > a')[0].className
      ).toEqual('option-item available-selectable-option')
      expect(
        container.querySelectorAll('ul.list-level-0 > li > a')[2].className
      ).toEqual('option-item only-read-option')
    })
  })

  describe('when receive values prop', () => {
    it('should show instead of placeholder the list of labels of options included on values', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          placeholder="select items"
          options={mockOptions}
          onChangeValue={mockOnChange}
          values={['1', '1-1-1', '3-1-1', '2']}
          valueId="multiLevelFilter"
        />
      )
      expect(
        getByText('Filter 1 1 1, Filter 2, Filter 3 1 1')
      ).toBeInTheDocument()
    })

    it('should add selected-option class at labels when id included on values and no children or all children is included on values', () => {
      const { getByText, container } = render(
        <MultilevelFilterComponent
          placeholder="select items"
          options={mockOptions}
          onChangeValue={mockOnChange}
          values={[
            '1',
            '1-1',
            '1-1-1',
            '1-1-2',
            '2',
            '3-1-1',
            '3-1-2',
            '3-1-3',
          ]}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(
        getByText(
          'Filter 1 1 1, Filter 1 1 2, Filter 2, Filter 3 1 1, Filter 3 1 2, Filter 3 1 3'
        )
      )
      expect(
        container.querySelectorAll('ul.list-level-0 > li')[0].querySelector('a')
          .className
      ).toEqual('option-item available-selectable-option')
      expect(
        container
          .querySelectorAll('ul.list-level-0 > li')[0]
          .querySelectorAll('ul > li')[0]
          .querySelector('a').className
      ).toEqual('option-item available-selectable-option selected-option')
      expect(
        container.querySelectorAll('ul.list-level-0 > li')[1].querySelector('a')
          .className
      ).toEqual('option-item available-selectable-option selected-option')
      expect(
        container.querySelectorAll('ul.list-level-0 > li')[2].querySelector('a')
          .className
      ).toEqual('option-item only-read-option selected-option')
    })
  })

  describe('when receive onChangeValue and valueId props and click on item', () => {
    it('should call onChangeValue with values + itemId and valueId when dont have children and id dont include in values', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1-1-1', '1-1-2', '3-1-1']}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filter 1 1 1, Filter 1 1 2, Filter 3 1 1'))
      fireEvent.click(getByText('Filter 2'))
      expect(mockOnChange).toHaveBeenCalledWith(
        ['1-1-1', '1-1-2', '3-1-1', '2'],
        'multiLevelFilter'
      )
    })

    it('should call onChangeValue with values + itemId and valueId when children lenth equal 0 and id dont include in values', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1-1-1', '1-1-2', '3-1-1']}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filter 1 1 1, Filter 1 1 2, Filter 3 1 1'))
      fireEvent.click(getByText('Filter 4'))
      expect(mockOnChange).toHaveBeenCalledWith(
        ['1-1-1', '1-1-2', '3-1-1', '4'],
        'multiLevelFilter'
      )
    })

    it('should call onChangeValue with values without itemId when dont have children and id include in values', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1-1-1', '1-1-2', '3-1-1']}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filter 1 1 1, Filter 1 1 2, Filter 3 1 1'))
      fireEvent.click(getByText('Filter 1 1 1'))
      expect(mockOnChange).toHaveBeenCalledWith(
        ['1-1-2', '3-1-1'],
        'multiLevelFilter'
      )
    })

    it('should call onChangeValue with values added all children itemsId when item have children and values not include all children id', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1-1-1', '1-1-2', '3-1-1']}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filter 1 1 1, Filter 1 1 2, Filter 3 1 1'))
      fireEvent.click(getByText('Filter 1'))
      expect(mockOnChange).toHaveBeenCalledWith(
        ['1-1-1', '1-1-2', '3-1-1', '1-2'],
        'multiLevelFilter'
      )
    })

    it('should call onChangeValue with the values removing all children itemsId when item have children and all children id included on values', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1', '1-1-1', '1-1-2', '1-2', '3-1-1']}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(
        getByText('Filter 1 1 1, Filter 1 1 2, Filter 1 2, Filter 3 1 1')
      )
      fireEvent.click(getByText('Filter 1'))
      expect(mockOnChange).toHaveBeenCalledWith(['3-1-1'], 'multiLevelFilter')
      fireEvent.click(
        getByText('Filter 1 1 1, Filter 1 1 2, Filter 1 2, Filter 3 1 1')
      )
      fireEvent.click(getByText('Filter 1 1'))
      expect(mockOnChange).toHaveBeenCalledWith(
        ['1', '1-2', '3-1-1'],
        'multiLevelFilter'
      )
    })

    it('should do not call onChangeValue when item have notSelectable prop', () => {
      const mockOnChangeNoCall = jest.fn()
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={['1', '1-1-1', '1-1-2', '1-2', '3-1-1']}
          onChangeValue={mockOnChangeNoCall}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(
        getByText('Filter 1 1 1, Filter 1 1 2, Filter 1 2, Filter 3 1 1')
      )
      fireEvent.click(getByText('Filter 3'))
      expect(mockOnChangeNoCall).toHaveBeenCalledTimes(0)
    })
  })

  describe('when receive label prop', () => {
    it('should show label on the component when have label prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          label="component label"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(getByText('component label')).toBeInTheDocument()
    })
  })

  describe('when receive labelClassName prop', () => {
    it('should replace label class on the component when have labelClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          label="component label"
          labelClassName="custom-label"
        />
      )
      expect(getByText('component label').className).toEqual('custom-label')
    })

    it('should have class label on the component when do not have labelClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          label="component label"
        />
      )
      expect(getByText('component label').className).toEqual('label')
    })
  })

  describe('when receive selectorClassName prop', () => {
    it('should replace selector class on the component when have selectorClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          selectorClassName="custom-selector"
        />
      )
      expect(getByText('Filtrar').parentElement.className).toContain(
        'custom-selector'
      )
      expect(getByText('Filtrar').parentElement.className).not.toContain(
        'action-button'
      )
    })

    it('should have class selector on the component when do not have selectorClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      expect(getByText('Filtrar').parentElement.className).toContain(
        'action-button'
      )
    })
  })

  describe('when receive optionsClassName prop', () => {
    it('should replace options class on the component when have optionsClassName prop', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          optionsClassName="custom-options"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelector('ul').className).toContain(
        'list-level-0 custom-options'
      )
      expect(container.querySelector('ul').className).not.toContain(
        'option-list'
      )
    })

    it('should add options class selected-option on the component when do not have optionsClassName prop', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelector('ul').className).toContain(
        'list-level-0 option-list'
      )
    })
  })

  describe('when receive extraLabelClassName prop', () => {
    it('should add to label class the extraLabelClassName when have extraLabelClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          label="component label"
          extraLabelClassName="extra-label-class"
        />
      )
      expect(getByText('component label').className).toEqual(
        'label extra-label-class'
      )
    })
  })

  describe('when receive extraOptionsClassName prop', () => {
    it('should add to options class the extraOptionsClassName when have extraOptionsClassName prop', () => {
      const { getByText, container } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          extraOptionsClassName="extra-options-class"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelector('ul').className).toContain(
        'list-level-0 option-list extra-options-class'
      )
    })
  })

  describe('when receive extraSelectorClassName prop', () => {
    it('should add to selector class the extraSelectorClassName when have extraSelectorClassName prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          extraSelectorClassName="extra-selector-class"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(getByText('Filtrar').parentElement.className).toContain(
        'extra-selector-class'
      )
    })
  })

  describe('when receive maxSelectorWidth prop', () => {
    it('should add to selector style maxWidth equal to maxSelectorWidth prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          maxSelectorWidth="300px"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(getByText('Filtrar').parentElement.getAttribute('style')).toEqual(
        'max-width: 300px;'
      )
    })

    it('should do not have maxWidth when do not have maxSelectorWidth prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(
        getByText('Filtrar').parentElement.getAttribute('style')
      ).toBeNull()
    })
  })

  describe('when receive minSelectorWidth prop', () => {
    it('should add to selector style minWidth equal to minSelectorWidth prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          minSelectorWidth="100px"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(getByText('Filtrar').parentElement.getAttribute('style')).toEqual(
        'min-width: 100px;'
      )
    })

    it('should do not have minWidth when do not have minSelectorWidth prop', () => {
      const { getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(
        getByText('Filtrar').parentElement.getAttribute('style')
      ).toBeNull()
    })
  })

  describe('when receive minOptionsWidth prop', () => {
    it('should add to options style minWidth equal to minOptionsWidth prop', () => {
      const { getByText, container } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          extraSelectorClassName="extra-selector-class"
          minOptionsWidth="100px"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(container.querySelectorAll('ul')[0].getAttribute('style')).toEqual(
        'min-width: 100px;'
      )
    })

    it('should do not have options style minWidth when do not have minOptionsWidth prop', () => {
      const { container, getByText } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
        />
      )
      fireEvent.click(getByText('Filtrar'))
      expect(
        container.querySelectorAll('ul')[0].getAttribute('style')
      ).toBeNull()
    })
  })

  describe('when receive customIcon prop', () => {
    it('should replace arrow by customIcon prop content when have customIcon', () => {
      const { container } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          extraSelectorClassName="extra-selector-class"
          customIcon={<span>{'>'}</span>}
        />
      )
      expect(container.querySelector('.custom-icon').innerHTML).toEqual(
        '<span>&gt;</span>'
      )
    })

    it('should do not replace arrow by customIcon when do not have customIcon', () => {
      const { container } = render(
        <MultilevelFilterComponent
          options={mockOptions}
          values={[]}
          onChangeValue={mockOnChange}
          valueId="multiLevelFilter"
          extraSelectorClassName="extra-selector-class"
        />
      )
      expect(container.querySelector('.custom-icon')).toBeNull()
    })
  })
})

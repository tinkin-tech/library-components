import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TableComponent, { ILabelProps, ITableRows } from './TableComponent'

describe('render component <TableComponent>', () => {
  const labelProps: ILabelProps[] = [
    { id: 'name', label: 'User Name', width: 25, typeWidth: '%' },
    { id: 'avatar', label: 'User Avatar', width: 15, typeWidth: '%' },
    { id: 'isActive', label: 'Is Active', width: 35, typeWidth: '%' },
    { id: 'count', label: 'Count', width: 50, typeWidth: 'px' },
    { id: 'action', label: 'Acción', width: 30, typeWidth: 'px' },
  ]

  const mockFunction = jest.fn()

  const tableRows: ITableRows[] = [
    {
      id: 1,
      columns: [
        {
          type: 'string',
          value: 'content text',
          onClick: mockFunction,
          id: 'name',
          cellClassName: 'custom-cell-class',
        },
        {
          type: 'image',
          value: 'image-url.png',
          id: 'avatar',
          cellClassName: 'custom-cell-class-avatar',
          minHeight: 200,
        },
        {
          type: 'switch',
          value: true,
          id: 'isActive',
        },
        {
          type: 'number',
          value: 2,
          id: 'count',
        },
        {
          type: 'custom',
          value: <a>button</a>,
          id: 'action',
        },
      ],
    },
    {
      id: 15,
      columns: [
        {
          type: 'string',
          value: 'content name',
          onClick: mockFunction,
          id: 'name',
        },
        {
          type: 'switch',
          value: true,
          id: 'isActive',
        },
        {
          type: 'number',
          value: 2,
          id: 'count',
        },
      ],
    },
  ]

  const cases = [
    { key: 0, label: 'User Name', styleWidth: '25%' },
    { key: 1, label: 'User Avatar', styleWidth: '15%' },
    { key: 2, label: 'Is Active', styleWidth: '35%' },
    { key: 3, label: 'Count', styleWidth: '50px' },
    { key: 4, label: 'Acción', styleWidth: '30px' },
  ]

  describe('when render list of labels', () => {
    it('should show a list same to labelsProps length', () => {
      const { container } = render(
        <TableComponent labelProps={labelProps} tableRows={tableRows} />
      )
      const currentSelector = container.querySelectorAll('header > div')
      expect(currentSelector).toHaveLength(5)
    })

    it.each(cases)(
      'should show a label text in a list item %#',
      (objectData: { key: number; label: string }) => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('header > div')
        expect(currentSelector[objectData.key].innerHTML).toContain(
          objectData.label
        )
      }
    )

    it.each(cases)(
      'should have style with width a item.width + item.typeWidth on ' +
        'list item %#',
      (objectData: { key: number; label: string; styleWidth: string }) => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('header > div')
        expect(currentSelector[objectData.key].getAttribute('style')).toEqual(
          `width: ${objectData.styleWidth};`
        )
      }
    )
  })

  describe('when render list of rows', () => {
    it('should show a list to rows same to tableRows length', () => {
      const { container } = render(
        <TableComponent labelProps={labelProps} tableRows={tableRows} />
      )
      const currentSelector = container.querySelectorAll('section > div')
      expect(currentSelector).toHaveLength(2)
    })

    it('should show a list into rows same to labelProps length', () => {
      const { container } = render(
        <TableComponent labelProps={labelProps} tableRows={tableRows} />
      )
      const currentSelector = container.querySelectorAll('section > div')[1]
        .childNodes
      expect(currentSelector).toHaveLength(5)
    })

    it(
      'should add class to the column equal to value.type when ' +
        'find column',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children[0]
        expect(currentSelector.className).toContain('string')
      }
    )

    it(
      'should to show a image with src equal value when find column and ' +
        'columnItem type is image',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children[1]
        expect(currentSelector.children[0].getAttribute('style')).toEqual(
          `background-image: url(image-url.png);`
        )
      }
    )

    it(
      'should to show a switch active when find column and columnItem ' +
        'type is switch and value true',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children[2]
        expect(currentSelector.querySelector('div').className).toContain(
          'active-switch'
        )
      }
    )

    it(
      'should to show a switch inactive when find column and columnItem ' +
        'type is switch and value false',
      () => {
        const newTableRows = [...tableRows]
        newTableRows[0].columns[2].value = false
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={newTableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children[2]
        expect(currentSelector.querySelector('div').className).toContain(
          'inactive-switch'
        )
      }
    )

    it(
      'should to show a value when find column and columnItem type is ' +
        'string number or custom',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        expect(currentSelector[0].innerHTML).toEqual('content text')
        expect(currentSelector[3].innerHTML).toEqual('2')
        expect(currentSelector[4].innerHTML).toEqual('<a>button</a>')
      }
    )

    it.each(cases)(
      'should have style with width a item.width + item.typeWidth ' +
        'on columnItem%#',
      (objectData: { key: number; styleWidth: string }) => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        expect(currentSelector[objectData.key].getAttribute('style')).toContain(
          `width: ${objectData.styleWidth};`
        )
      }
    )

    it(
      'should add className to columnItem when columnItem have ' +
        'cellClassName',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        expect(currentSelector[0].className).toEqual(
          'table-row-cell string custom-cell-class click-row'
        )
        expect(currentSelector[2].className).toEqual('table-row-cell switch')
      }
    )

    it(
      'should add minHeight style to columnItem when columnItem ' +
        'have minHeight',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        expect(currentSelector[1].getAttribute('style')).toEqual(
          'width: 15%; height: 200px;'
        )
      }
    )

    it(
      'should do not call onClick when press columnItem and ' +
        'columnItem do not have onClick',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        fireEvent.click(currentSelector[2])
        expect(mockFunction).toHaveBeenCalledTimes(0)
      }
    )

    it(
      'should call onClick when press columnItem and columnItem ' +
        'have onClick',
      () => {
        const { container } = render(
          <TableComponent labelProps={labelProps} tableRows={tableRows} />
        )
        const currentSelector = container.querySelectorAll('section > div')[0]
          .children
        fireEvent.click(currentSelector[0])
        expect(mockFunction).toHaveBeenCalledWith(tableRows[0])
      }
    )
  })

  describe('when receive activeRowId', () => {
    it(
      'should call add class row-active on row when rowId equal ' +
        'to activeRowId',
      () => {
        const { container } = render(
          <TableComponent
            labelProps={labelProps}
            tableRows={tableRows}
            activeRowId={15}
          />
        )
        const currentSelector = container.querySelectorAll('section > div')[1]
        expect(currentSelector.className).toContain('row-active')
      }
    )
  })

  describe('when receive extraLabelsClassName', () => {
    it(
      'should call add class equal to extraLabelsClassName on parent ' +
        'labels when extraLabelsClassName exist',
      () => {
        const { container } = render(
          <TableComponent
            labelProps={labelProps}
            tableRows={tableRows}
            extraLabelsClassName="extra-label-class"
          />
        )
        const currentSelector = container.querySelector('header')
        expect(currentSelector.className).toContain('extra-label-class')
      }
    )
  })

  describe('when receive extraContentClassName', () => {
    it(
      'should call add class equal to extraContentClassName on ' +
        'parent content section when extraContentClassName exist',
      () => {
        const { container } = render(
          <TableComponent
            labelProps={labelProps}
            tableRows={tableRows}
            extraContentClassName="extra-content-class"
          />
        )
        const currentSelector = container.querySelector('section')
        expect(currentSelector.className).toContain('extra-content-class')
      }
    )
  })
})

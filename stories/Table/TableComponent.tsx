import * as React from 'react'
import { CSS } from 'reactcss'

type ITypeWidth = '%' | 'px'

export interface ILabelProps {
  id: string
  label: string
  width: number
  typeWidth: ITypeWidth
}

type IRowTypes = 'string' | 'number' | 'image' | 'switch' | 'custom'

type IValue = {
  string: string
  number: number
  image: string
  switch: boolean
  custom: JSX.Element
}

type ObjectType = keyof IValue

export interface ITableRowColumn<T extends ObjectType> {
  type: T
  value: IValue[T]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (item: any) => void
  id: number | string
  cellClassName?: string
  minHeight?: number
}

export interface ITableRows {
  id: string | number
  columns: Array<ITableRowColumn<IRowTypes>>
}

export interface ITableProps {
  labelProps: Array<ILabelProps>
  tableRows: Array<ITableRows>
  activeRowId?: string | number
  extraLabelsClassName?: string
  extraContentClassName?: string
}

export const TableComponent = (props: ITableProps): React.ReactElement => {
  const {
    tableRows,
    labelProps,
    activeRowId,
    extraLabelsClassName,
    extraContentClassName,
  } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTableContent = (cell: ITableRowColumn<IRowTypes>): any => {
    if (!cell) {
      return null
    }
    switch (cell.type) {
      case 'image':
        const style = {
          backgroundImage: `url(${cell.value})`,
        }
        return <div className="image-container" style={style} />
      case 'switch':
        return (
          <div
            className={`switch-container ${
              cell.value ? 'active-switch' : 'inactive-switch'
            }`}
          />
        )
      default:
        return cell.value
    }
  }
  return (
    <div className="table-component">
      <header
        className={`table-labels${
          extraLabelsClassName ? ` ${extraLabelsClassName}` : ''
        }`}
      >
        {labelProps.map((label, key) => {
          const style = {
            width: `${label.width}${label.typeWidth}`,
          }
          return (
            <div className="label-column" key={key} style={style}>
              {label.label}
            </div>
          )
        })}
      </header>
      <section
        className={`table-rows ${
          extraContentClassName ? `${extraContentClassName}` : ''
        }`}
      >
        {tableRows.map((row, key) => (
          <div
            key={key}
            className={`table-row-item ${
              activeRowId === row.id && 'row-active'
            }`}
          >
            {labelProps.map((column, columnKey) => {
              const style: CSS = {
                width: `${column.width}${column.typeWidth}`,
              }
              const cellValues = row.columns.find(
                (rowColumn) => rowColumn.id === column.id
              )
              if (cellValues?.minHeight) {
                style.height = `${cellValues.minHeight}px`
              }
              const cellClass: string[] = ['table-row-cell', cellValues?.type]
              if (cellValues?.cellClassName) {
                cellClass.push(cellValues.cellClassName)
              }
              if (cellValues?.onClick) {
                cellClass.push('click-row')
              }
              return (
                <div
                  onClick={(): void =>
                    cellValues.onClick && cellValues.onClick(row)
                  }
                  style={style}
                  className={cellClass.join(' ')}
                  key={columnKey}
                  data-title={column.label}
                >
                  {getTableContent(cellValues)}
                </div>
              )
            })}
          </div>
        ))}
      </section>
    </div>
  )
}

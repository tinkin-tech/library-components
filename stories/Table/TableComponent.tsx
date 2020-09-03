import * as React from 'react'

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
  onClick?: (item: any) => void
  id: number | string
  cellClassName?: string
}

export interface ITableRows {
  id: string | number
  columns: ITableRowColumn<IRowTypes>[]
}

export interface ITableProps {
  labelProps: ILabelProps[]
  tableRows: ITableRows[]
  activeRowId?: string | number
  extraLabelsClassName?: string
  extraContentClassName?: string
}

const TableComponent = (props: ITableProps) => {
  const {
    tableRows,
    labelProps,
    activeRowId,
    extraLabelsClassName,
    extraContentClassName,
  } = props
  const getTableContent = (cell: ITableRowColumn<IRowTypes>) => {
    if (!cell) {
      return null
    }
    switch (cell.type) {
      case 'image':
        return <img src={cell.value.toString()} alt="" />
      case 'switch':
        return (
          <div
            className={`${cell.value ? 'active-switch' : 'inactive-switch'}`}
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
            <div key={key} style={style}>
              {label.label}
            </div>
          )
        })}
      </header>
      <section
        className={`${extraContentClassName ? `${extraContentClassName}` : ''}`}
      >
        {tableRows.map((row, key) => {
          return (
            <div
              key={key}
              className={`${activeRowId === row.id && 'row-active'}`}
            >
              {labelProps.map((column, columnKey) => {
                const style = {
                  width: `${column.width}${column.typeWidth}`,
                }
                const cellValues = row.columns.find(
                  (rowColumn) => rowColumn.id === column.id
                )
                return (
                  <div
                    onClick={() =>
                      cellValues.onClick && cellValues.onClick(row)
                    }
                    style={style}
                    className={`${cellValues?.type}${
                      cellValues?.cellClassName
                        ? ` ${cellValues.cellClassName}`
                        : ''
                    }`}
                    key={columnKey}
                  >
                    {getTableContent(cellValues)}
                  </div>
                )
              })}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default TableComponent

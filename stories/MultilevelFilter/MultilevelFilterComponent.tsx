import * as React from 'react'

import language from './language/es_EC'
import { CSS } from 'reactcss'

export interface IMultilevelOptionChild {
  id: string | number
  label: string
  notSelectable?: boolean
  customClass?: string
  children?: Array<IMultilevelOptionChild>
}

export interface IMultilevelFilter {
  placeholder?: string
  options: Array<IMultilevelOptionChild>
  values: Array<string | number>
  onChangeValue: (values: Array<string | number>, valueId: string) => void
  valueId: string
  label?: string
  labelClassName?: string
  optionsClassName?: string
  extraLabelClassName?: string
  extraOptionsClassName?: string
  selectorClassName?: string
  extraSelectorClassName?: string
  maxSelectorWidth?: string
  minSelectorWidth?: string
  minOptionsWidth?: string
  customIcon?: JSX.Element
}
interface IHelperSelectedItems {
  id: number | string
  label: string
  isSelected: boolean
  haveChild: boolean
}

const MultilevelFilterComponent = (
  props: IMultilevelFilter
): React.ReactElement => {
  const {
    placeholder,
    options,
    values,
    onChangeValue,
    valueId,
    label,
    labelClassName,
    optionsClassName,
    extraLabelClassName,
    extraOptionsClassName,
    selectorClassName,
    extraSelectorClassName,
    maxSelectorWidth,
    minSelectorWidth,
    minOptionsWidth,
    customIcon,
  } = props
  const multiLevelFilterRef = React.useRef(null)
  const [activeList, changeActiveList] = React.useState(false)
  const [selectedValuesHelper, changeSelectedValuesHelper] = React.useState<
    Array<IHelperSelectedItems>
  >([])
  const concatIds = (
    child: Array<IMultilevelOptionChild>
  ): Array<string | number> => {
    const mergeValues = [...values]
    const recursiveAdd = (childList: Array<IMultilevelOptionChild>): void => {
      childList.forEach((item) => {
        if (
          (!item.children || (item.children && !item.children.length)) &&
          !mergeValues.includes(item.id)
        ) {
          mergeValues.push(item.id)
        }
        if (item.children) {
          recursiveAdd(item.children)
        }
      })
    }
    recursiveAdd(child)
    return mergeValues
  }
  const filterIds = (
    children: IMultilevelOptionChild
  ): Array<string | number> => {
    let mergeValues = [...values]
    mergeValues = mergeValues.filter((item) => item !== children.id)
    const recursiveRemove = (
      childList: Array<IMultilevelOptionChild>
    ): void => {
      childList.forEach((itemChildren) => {
        mergeValues = mergeValues.filter((item) => item !== itemChildren.id)
        if (itemChildren.children) {
          recursiveRemove(itemChildren.children)
        }
      })
    }
    recursiveRemove(children.children)
    return mergeValues
  }
  const onSelectLevel = (link: IMultilevelOptionChild): void => {
    let newValue = []
    changeActiveList(false)
    if (!link.children?.length) {
      newValue = values.includes(link.id)
        ? values.filter((value) => value !== link.id)
        : [...values, link.id]
      onChangeValue(newValue, valueId)
    } else {
      const isSelectedParent = selectedValuesHelper.find(
        (item) => item.id === link.id
      )
      if (!isSelectedParent) {
        onChangeValue(concatIds(link.children), valueId)
      } else {
        onChangeValue(filterIds(link), valueId)
      }
    }
  }
  const validateAllChildSelected = (
    listItem: IMultilevelOptionChild
  ): boolean => {
    const haveChild = !!(listItem.children && listItem.children.length)
    if (values.includes(listItem.id) && !haveChild) {
      return true
    } else if (!values.includes(listItem.id) && !haveChild) {
      return false
    }
    let allChildSelected = true
    let n = 0
    while (n < listItem.children.length && allChildSelected) {
      const item = listItem.children[n]
      if (
        !values.includes(item.id) &&
        (!item.children || !item.children.length)
      ) {
        allChildSelected = false
        break
      }
      if (item.children) {
        let i = 0
        while (i < item.children.length && allChildSelected) {
          const childValidation = validateAllChildSelected(item.children[i])
          if (!childValidation) {
            allChildSelected = false
          }
          i++
        }
      }
      n++
    }
    return allChildSelected
  }
  const selectedItemsHelper = (): void => {
    const itemsSelected: Array<IHelperSelectedItems> = []
    const recursiveValidation = (list: Array<IMultilevelOptionChild>): void => {
      list.forEach((item) => {
        const allChildSelected = validateAllChildSelected(item)
        if (allChildSelected) {
          const newItem: IHelperSelectedItems = {
            id: item.id,
            label: item.label,
            isSelected: allChildSelected,
            haveChild: !!(item.children && item.children.length),
          }
          itemsSelected.push(newItem)
        }
        if (item.children) {
          recursiveValidation(item.children)
        }
      })
    }
    recursiveValidation(options)
    changeSelectedValuesHelper(itemsSelected)
  }
  const genValue = (): string => {
    return selectedValuesHelper.reduce((cumulator, value) => {
      if (!value.haveChild) {
        return `${cumulator}${cumulator ? ',' : ''} ${value.label}`
      }
      return cumulator
    }, '')
  }
  const genLinks = (
    list: Array<IMultilevelOptionChild>,
    listKey?: number
  ): React.ReactElement => {
    const activeLevel = listKey || 0
    const classList = [`app-scroll list-level-${activeLevel}`]
    if (!activeLevel) {
      classList.push(
        `${optionsClassName || 'option-list'}${
          extraOptionsClassName ? ` ${extraOptionsClassName}` : ''
        }`
      )
    }
    const optionsStyle: CSS = {}
    if (minOptionsWidth) {
      optionsStyle.minWidth = minOptionsWidth
    }
    return (
      <ul className={classList.join(' ')} style={optionsStyle}>
        {list.map((link, key) => {
          const activeReference = selectedValuesHelper.find(
            (itemRef) => itemRef.id === link.id
          )
          const linkClass = [
            'option-item',
            link.notSelectable
              ? 'only-read-option'
              : 'available-selectable-option',
          ]
          if (activeReference?.isSelected) {
            linkClass.push('selected-option')
          }
          return (
            <li key={key}>
              <a
                className={linkClass.join(' ')}
                onClick={(): void => !link.notSelectable && onSelectLevel(link)}
              >
                <span>{link.label}</span>
              </a>
              {link.children && genLinks(link.children, activeLevel + 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  const handleClickOutsideMultilevelFilter = (event: Event): void => {
    if (!multiLevelFilterRef.current.contains(event.target)) {
      changeActiveList(false)
    }
  }

  const valuesString = values.length
    ? genValue()
    : placeholder || language.FILTER

  const labelClass = [labelClassName || 'label']

  if (extraLabelClassName) {
    labelClass.push(extraLabelClassName)
  }

  React.useEffect(() => {
    selectedItemsHelper()
    document.addEventListener('click', handleClickOutsideMultilevelFilter)
    return (): void =>
      document.removeEventListener('click', handleClickOutsideMultilevelFilter)
  }, [])

  const selectorClass = [
    extraSelectorClassName || '',
    !values.length ? ' place-holder-text' : '',
    selectorClassName || 'action-button',
  ]
  const selectorStyle: CSS = {}
  if (maxSelectorWidth) {
    selectorStyle.maxWidth = maxSelectorWidth
  }
  if (minSelectorWidth) {
    selectorStyle.minWidth = minSelectorWidth
  }
  return (
    <div
      className={`multilevel-filter-component ${
        label ? 'component-with-label' : ''
      }`}
      ref={multiLevelFilterRef}
    >
      <a
        title={valuesString}
        style={selectorStyle}
        onClick={(): void => changeActiveList(!activeList)}
        className={`${selectorClass.join(' ')}`}
      >
        {label && <span className={labelClass.join(' ')}>{label}</span>}
        <span className="truncate">{valuesString}</span>
        {customIcon ? (
          <div className="custom-icon">{customIcon}</div>
        ) : (
          <i className="icon-arrow-down" />
        )}
      </a>
      {activeList && genLinks(options)}
    </div>
  )
}

export default MultilevelFilterComponent

import * as React from 'react'

import language from './language/es_EC'

interface IOptionChild {
  id: string | number
  label: string
  notSelectable?: boolean
  customClass?: string
  children?: Array<IOptionChild>
}

export interface IMultilevelFilter {
  placeholder?: string
  options: Array<IOptionChild>
  values: Array<string | number>
  onChangeValue: (values: Array<string | number>, valueId: string) => void
  valueId: string
  label?: string
  labelClassName?: string
  optionsClassName?: string
  extraLabelClassName?: string
  extraOptionsClassName?: string
}
interface IHelperSelectedItems {
  id: number | string
  label: string
  isSelected: boolean
  haveChild: boolean
}

const MultilevelFilterComponent = (props: IMultilevelFilter) => {
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
  } = props
  const multiLevelFilterRef = React.useRef(null)
  const [activeList, changeActiveList] = React.useState(false)
  const [selectedValuesHelper, changeSelectedValuesHelper] = React.useState<
    Array<IHelperSelectedItems>
  >([])
  const concatIds = (child: Array<IOptionChild>) => {
    const mergeValues = [...values]
    const recursiveAdd = (childList: Array<IOptionChild>) => {
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
  const filterIds = (children: IOptionChild) => {
    let mergeValues = [...values]
    mergeValues = mergeValues.filter((item) => item !== children.id)
    const recursiveRemove = (childList: Array<IOptionChild>) => {
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
  const onSelectLevel = (link: IOptionChild) => {
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
  const validateAllChildSelected = (listItem: IOptionChild) => {
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
  const selectedItemsHelper = () => {
    const itemsSelected: Array<IHelperSelectedItems> = []
    const recursiveValidation = (list: Array<IOptionChild>) => {
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
  const genValue = () => {
    return selectedValuesHelper.reduce((cumulator, value) => {
      if (!value.haveChild) {
        return `${cumulator}${cumulator ? ',' : ''} ${value.label}`
      }
      return cumulator
    }, '')
  }
  const genLinks = (list: Array<IOptionChild>, listKey?: number) => {
    const activeLevel = listKey || 0
    const classList = [`list-level-${activeLevel}`]

    if (!activeLevel) {
      classList.push(
        `${optionsClassName || 'option-list'}${
          extraOptionsClassName ? ` ${extraOptionsClassName}` : ''
        }`
      )
    }

    const linkList = (
      <ul className={classList.join(' ')}>
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
                onClick={() => !link.notSelectable && onSelectLevel(link)}
              >
                {link.label}
              </a>
              {link.children && genLinks(link.children, activeLevel + 1)}
            </li>
          )
        })}
      </ul>
    )
    return linkList
  }

  const handleClickOutsideMultilevelFilter = (event: Event) => {
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

  return (
    <div className="multilevel-filter-component" ref={multiLevelFilterRef}>
      <a onClick={() => changeActiveList(!activeList)}>
        {valuesString}
        {label && <span className={labelClass.join(' ')}>{label}</span>}
      </a>
      {activeList && genLinks(options)}
    </div>
  )
}

export default MultilevelFilterComponent

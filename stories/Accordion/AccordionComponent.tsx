import * as React from 'react'

export interface IAccordionList {
  openLabel: string
  closeLabel: string
  content: React.ReactElement
}

export interface IAccordionComponentProps {
  defaultKeyOpen: number
  accordionList: IAccordionList[]
}

const AccordionComponent = (
  props: IAccordionComponentProps
): React.ReactElement => {
  const { accordionList, defaultKeyOpen } = props
  const [openAccordionItems, changeOpenAccordionItems] = React.useState([
    defaultKeyOpen,
  ])
  const handleShowContentOfAccordionItem = (index: number): void => {
    const NEGATIVE_INDEX = -1
    const openAccordionItemsCopy = [...openAccordionItems]
    const indexOfItem = openAccordionItems.indexOf(index)
    if (indexOfItem === NEGATIVE_INDEX) {
      openAccordionItemsCopy.push(index)
      changeOpenAccordionItems(openAccordionItemsCopy)
    } else {
      changeOpenAccordionItems(
        openAccordionItemsCopy.filter((item) => item !== index)
      )
    }
  }
  return (
    <div className="accordion-component">
      {accordionList.map((accordion, index) => (
        <div
          className={`accordion-item p-b-lg ${
            openAccordionItems.includes(index) ? 'open' : ''
          }`}
          key={index}
        >
          <a
            className="cursor-pointer bg-white flex-row flex-center cursor-pointer color-primary toggle-switch"
            onClick={(): void => handleShowContentOfAccordionItem(index)}
          >
            <div className="icon-content">
              <span
                className={`${
                  openAccordionItems.includes(index)
                    ? 'icon-arrow-top'
                    : 'icon-arrow-down'
                } text-primary`}
              />
            </div>
            <div className="toggle-text">
              {openAccordionItems.includes(index)
                ? accordion.openLabel
                : accordion.closeLabel}
            </div>
          </a>
          {openAccordionItems.includes(index) && <div>{accordion.content}</div>}
        </div>
      ))}
    </div>
  )
}

export default AccordionComponent

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
  const indexIsIncludesOnAccordionItems = (index: number): boolean =>
    openAccordionItems.includes(index)
  const handleShowContentOfAccordionItem = (index: number): void => {
    changeOpenAccordionItems(
      indexIsIncludesOnAccordionItems(index)
        ? openAccordionItems.filter((item) => item !== index)
        : [...openAccordionItems, index]
    )
  }
  return (
    <div className="accordion-component">
      {accordionList.map((accordion, index) => (
        <div
          className={`accordion-item ${
            indexIsIncludesOnAccordionItems(index) ? 'open' : ''
          }`}
          key={index}
        >
          <a
            className="cursor-pointer flex-row flex-center cursor-pointer toggle-switch"
            onClick={(): void => handleShowContentOfAccordionItem(index)}
          >
            <div className="icon-content">
              <span
                className={`${
                  indexIsIncludesOnAccordionItems(index)
                    ? 'icon-arrow-top'
                    : 'icon-arrow-down'
                }`}
              />
            </div>
            <div className="toggle-text">
              {indexIsIncludesOnAccordionItems(index)
                ? accordion.openLabel
                : accordion.closeLabel}
            </div>
          </a>
          {indexIsIncludesOnAccordionItems(index) && (
            <div>{accordion.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AccordionComponent

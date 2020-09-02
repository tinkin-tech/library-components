import * as React from 'react'

export type IPosition =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'bottomLeft'
  | 'topLeft'

interface ITooltipComponent {
  children: React.ReactElement
  content: React.ReactElement | string
  maxWidth?: number
  containerClassName?: string
  position?: IPosition
  extraContainerClassName?: string
}

const TooltipComponent: React.FC<ITooltipComponent> = (
  props: ITooltipComponent
) => {
  const {
    content,
    children,
    maxWidth = 200,
    containerClassName,
    position = 'bottom',
    extraContainerClassName,
  } = props
  const tooltip = React.useRef(null)
  const [containerHeight, handleContainerHeight] = React.useState(0)
  const [showContent, handleShowContent] = React.useState(false)
  const [tooltipStyle, handleTooltipStyle] = React.useState({})

  const calcHeight = (e: React.MouseEvent<HTMLDivElement>): void => {
    handleShowContent(true)
    handleContainerHeight(e.currentTarget.offsetHeight)
  }

  const getTooltipStyles = (): void => {
    const tooltipContent = tooltip.current
    const tooltipItemWidth = tooltipContent
      ? tooltipContent.offsetWidth
      : maxWidth
    const tooltipItemHeight = tooltipContent
      ? tooltipContent.clientHeight
      : containerHeight
    switch (position) {
      case 'bottom':
      case 'top':
        handleTooltipStyle({
          maxWidth: `${maxWidth}px`,
          marginLeft: `${-tooltipItemWidth / 2}px`,
        })
        break
      case 'left':
      case 'right':
        handleTooltipStyle({
          maxWidth: `${maxWidth}px`,
          marginTop: `${-tooltipItemHeight / 2}px`,
        })
    }
  }

  const tooltipClassObject = [
    containerClassName || 'tooltip-component',
    extraContainerClassName || '',
  ].filter((item) => item)

  React.useEffect(() => {
    getTooltipStyles()
  }, [showContent])

  return (
    <div
      className={tooltipClassObject.join(' ')}
      onMouseEnter={calcHeight}
      onMouseLeave={(): void => handleShowContent(false)}
    >
      {children}
      {showContent && (
        <div
          ref={tooltip}
          className={
            `tooltip-container text-white bg-secondary small ${position}` +
              `-position`
          }
          style={tooltipStyle}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default TooltipComponent

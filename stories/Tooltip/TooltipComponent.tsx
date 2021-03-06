import * as React from 'react'

export type IPosition =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'bottomLeft'
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'

export interface ITooltipComponent {
  children: React.ReactElement
  content: React.ReactElement | string
  maxWidth?: number
  containerClassName?: string
  position?: IPosition
  extraContainerClassName?: string
}

export const TooltipComponent: React.FC<ITooltipComponent> = (
  props: ITooltipComponent
) => {
  const {
    content,
    children,
    maxWidth,
    containerClassName,
    position = 'bottom',
    extraContainerClassName,
  } = props
  const tooltipContainer = React.useRef(null)
  const [showContent, handleShowContent] = React.useState(false)
  const [tooltipStyle, handleTooltipStyle] = React.useState({})
  const defaultWidth = 200
  const width = maxWidth || defaultWidth

  const getTooltipStyles = (): void => {
    const tooltipContainerItemHeight = tooltipContainer.current.offsetHeight
    const leftPixels = 2
    switch (position) {
      case 'bottom':
        handleTooltipStyle({
          width: `${width}px`,
          top: 'calc(100% + .5rem)',
          left: `calc(50% - ${width / leftPixels}px)`,
        })
        break
      case 'top':
        handleTooltipStyle({
          width: `${width}px`,
          bottom: 'calc(100% + .5rem)',
          left: `calc(50% - ${width / leftPixels}px)`,
        })
        break
      case 'left':
        handleTooltipStyle({
          width: `${width}px`,
          right: 'calc(100% + 1rem)',
          top: `calc(50% - ${tooltipContainerItemHeight}px)`,
        })
        break
      case 'right':
        handleTooltipStyle({
          width: `${width}px`,
          left: 'calc(100% + 1rem)',
          top: `calc(50% - ${tooltipContainerItemHeight}px)`,
        })
        break
      case 'bottomRight':
        handleTooltipStyle({
          width: `${width}px`,
          right: 0,
          top: 'calc(100% + .5rem)',
        })
        break
      case 'bottomLeft':
        handleTooltipStyle({
          width: `${width}px`,
          left: 0,
          top: 'calc(100% + .5rem)',
        })
        break
      case 'topLeft':
        handleTooltipStyle({
          width: `${width}px`,
          left: 0,
          bottom: 'calc(100% + .5rem)',
        })
        break
      case 'topRight':
        handleTooltipStyle({
          width: `${width}px`,
          right: 0,
          bottom: 'calc(100% + .5rem)',
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
      onMouseEnter={(): void => handleShowContent(true)}
      onMouseLeave={(): void => handleShowContent(false)}
      ref={tooltipContainer}
    >
      {children}
      {showContent && (
        <div
          className={`tooltip-container ${position}-position`}
          style={tooltipStyle}
        >
          {content}
        </div>
      )}
    </div>
  )
}

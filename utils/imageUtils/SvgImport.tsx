import * as React from 'react'
import { CODE_HTTP_RESPONSE } from '../../constants/codeHttpResponse'

interface IImageSvgInterface {
  icon: string
  // eslint-disable-next-line
  style?: object;
  className?: string
}

/* istanbul ignore next */
export const SvgImport = (props: IImageSvgInterface): JSX.Element => {
  const { icon, className, style } = props
  const [isLoadRef, changeIsLoadRef] = React.useState(false)
  // eslint-disable-next-line
  const iconRef: any = React.useRef()
  const loadImage = (): Promise<Element> =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line
      const xhr = new XMLHttpRequest();
      xhr.open('GET', icon)
      xhr.overrideMimeType('image/svg+xml')
      xhr.send('')
      xhr.onload = (): void => {
        if (
          xhr.status >= CODE_HTTP_RESPONSE.SUCCESS_200 &&
          xhr.status < CODE_HTTP_RESPONSE.SUCCESS_300
        ) {
          resolve(xhr.responseXML.documentElement)
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          })
        }
      }
      xhr.onerror = (): void => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }
    })

  const getIcon = async (): Promise<void> => {
    const icon = await loadImage()
    iconRef.current.append(icon)
  }

  React.useEffect(() => {
    changeIsLoadRef(true)
  }, [])

  React.useEffect(() => {
    if (isLoadRef && !iconRef.current?.child) {
      getIcon()
    }
  }, [isLoadRef])

  if (!props.icon) {
    return <div></div>
  }

  return (
    <div
      ref={iconRef}
      style={style || {}}
      className={`svg-icon ${className || ''}`}
    />
  )
}

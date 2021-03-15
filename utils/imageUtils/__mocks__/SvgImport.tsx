import * as React from 'react'

export const SvgImport = (props: {
  icon: string
  className: string
}): React.ReactElement => (
  <div className={`svgImport-mock ${props.className || ''}`}>{props.icon}</div>
)

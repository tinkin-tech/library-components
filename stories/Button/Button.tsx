import * as React from 'react'

interface PropsInterface {
  text: string
  action: () => void
  type: 'primary' | 'danger' | 'white' | 'info'
  typeButton?: 'border' | 'text' | 'small'
  className?: string
  disable?: boolean
}

const Button = (props: PropsInterface): React.ReactElement<PropsInterface> => {
  const { type, text, action, className, disable, typeButton } = props
  return (
    <a
      className={`button-component flex-row flex-no-wrap flex-middle ${
        disable ? 'disable' : ''
      } type-${type} ${typeButton}-button ${className || ''}`}
      data-testid="button-component"
      onClick={disable ? (): null => null : action}
    >
      <span className="flex-column">{text}</span>
    </a>
  )
}

export default React.memo(Button)

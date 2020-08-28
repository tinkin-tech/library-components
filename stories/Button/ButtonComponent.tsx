import * as React from 'react'

type buttonType =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'danger'
  | 'info'
  | 'success'
  | 'border-primary'
  | 'border-secondary'
  | 'border-warning'
  | 'border-danger'
  | 'border-info'
  | 'border-success'

interface IButtonComponent {
  buttonText: string
  onClick?: () => void
  disable?: boolean
  visualDisable?: boolean
  buttonType?: buttonType
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const {
    buttonText,
    onClick,
    disable,
    visualDisable,
    buttonType = 'primary',
  } = props

  return (
    <button
      value={buttonText}
      onClick={disable ? null : onClick}
      className={`${visualDisable ? 'disable' : ''} ${buttonType}`}
    />
  )
}

export default ButtonComponent

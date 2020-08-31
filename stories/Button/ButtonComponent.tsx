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
  smallButton?: boolean
  buttonClass?: string
  extraButtonClass?: string
  formButton?: boolean
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const {
    buttonText,
    onClick,
    disable,
    visualDisable,
    buttonType = 'primary',
    smallButton,
    buttonClass,
    extraButtonClass,
    formButton,
  } = props

  const buttonClassName =
    buttonClass ||
    `${visualDisable ? 'disable' : ''} ${buttonType} ${
      smallButton ? 'btn-small' : ''
    } ${extraButtonClass}`
  return formButton ? (
    <a onClick={disable ? null : onClick} className={buttonClassName}>
      {buttonText}
    </a>
  ) : (
    <button
      value={buttonText}
      onClick={disable ? null : onClick}
      className={buttonClassName}
    />
  )
}

export default ButtonComponent

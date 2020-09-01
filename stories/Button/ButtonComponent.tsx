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
  disabled?: boolean
  visualDisabled?: boolean
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
    disabled,
    visualDisabled,
    buttonType = 'primary',
    smallButton,
    buttonClass,
    extraButtonClass,
    formButton,
  } = props

  const buttonClassName =
    buttonClass ||
    `${(visualDisabled || disabled) && 'disabled'} ${buttonType} ${
      smallButton && 'btn-small'
    } ${extraButtonClass}`

  const componentProps = {
    onClick: disabled ? null : onClick,
    className: buttonClassName,
  }
  return formButton ? (
    <button {...componentProps}>{buttonText}</button>
  ) : (
    <a {...componentProps}>{buttonText}</a>
  )
}

export default ButtonComponent

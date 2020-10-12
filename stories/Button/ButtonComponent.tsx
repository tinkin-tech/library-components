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

export interface IButtonComponent {
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

export const ButtonComponent = (
  props: IButtonComponent
): React.ReactElement => {
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

  const buttonClassName = [
    visualDisabled ? 'button-visual-disable' : '',
    disabled ? 'button-disable' : '',
    buttonClass ||
      `button-component ${buttonType} ${smallButton && 'button-small'}`,
    extraButtonClass || '',
  ]

  const componentProps = {
    onClick: disabled ? null : onClick,
    className: buttonClassName.join(' '),
  }
  return formButton ? (
    <button {...componentProps}>{buttonText}</button>
  ) : (
    <a {...componentProps}>{buttonText}</a>
  )
}

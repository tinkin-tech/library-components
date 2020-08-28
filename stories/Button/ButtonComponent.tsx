import * as React from 'react'

interface IButtonComponent {
  buttonText: string
  onClick?: () => void
  disable?: boolean
  visualDisable?: boolean
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const { buttonText, onClick, disable, visualDisable } = props

  return (
    <button
      value={buttonText}
      onClick={disable ? null : onClick}
      className={visualDisable ? 'disable' : ''}
    />
  )
}

export default ButtonComponent

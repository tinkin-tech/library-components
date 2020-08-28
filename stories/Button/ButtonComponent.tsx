import * as React from 'react'

interface IButtonComponent {
  buttonText: string
  onClick?: () => void
  disable?: boolean
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const { buttonText, onClick, disable } = props

  return <button value={buttonText} onClick={disable ? null : onClick} />
}

export default ButtonComponent

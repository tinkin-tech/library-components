import * as React from 'react'

interface IButtonComponent {
  buttonText: string
  onClick?: () => void
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const { buttonText, onClick } = props

  return <button value={buttonText} onClick={onClick} />
}

export default ButtonComponent

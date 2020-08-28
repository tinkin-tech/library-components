import * as React from 'react'

interface IButtonComponent {
  buttonText: string
}

const ButtonComponent = (props: IButtonComponent): React.ReactElement => {
  const { buttonText } = props

  return <button value={buttonText} />
}

export default ButtonComponent

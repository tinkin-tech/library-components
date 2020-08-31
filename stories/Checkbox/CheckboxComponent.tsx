import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

interface CheckboxComponentPropsInterface {
  options: CheckboxOption[]
}

const CheckboxComponent: React.FC<CheckboxComponentPropsInterface> = (
  props: CheckboxComponentPropsInterface
) => {
  const { options } = props
  return (
    <>
      {options.map((option) => (
        <>
          <input type="checkbox" id={option.id.toString()} />
          <label htmlFor={option.id.toString()}>{option.label}</label>
        </>
      ))}
    </>
  )
}

export default CheckboxComponent

import * as React from 'react'

type CheckboxOption = {
  id: string | number
  label: string
}

interface CheckboxComponentPropsInterface {
  options: CheckboxOption[]
  values?: CheckboxOption[]
}

const CheckboxComponent: React.FC<CheckboxComponentPropsInterface> = (
  props: CheckboxComponentPropsInterface
) => {
  const { options, values = [] } = props
  return (
    <>
      {options.map((option) => (
        <>
          <input
            type="checkbox"
            id={option.id.toString()}
            checked={!!values.find((value) => value.id === option.id)}
          />
          <label htmlFor={option.id.toString()}>{option.label}</label>
        </>
      ))}
    </>
  )
}

export default CheckboxComponent

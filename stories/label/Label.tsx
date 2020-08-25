import * as React from 'react'

export interface LabelPropsInterface {
  referenceId?: string
  label: string
  required?: boolean
  error?: boolean
  disabled?: boolean
}

export const LabelComponent: React.FC<LabelPropsInterface> = (
  props: LabelPropsInterface
) => {
  const { referenceId, label, required, error } = props

  return (
    <label
      className={`label ${error ? 'label-error' : ''}`}
      htmlFor={referenceId}
      data-testid="label-component"
    >
      {`${label || ''}${required ? '*' : ''}`}&nbsp;
    </label>
  )
}

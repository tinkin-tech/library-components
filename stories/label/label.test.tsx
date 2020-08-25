import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { LabelComponent } from './Label'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const defaultLabel = (
  <LabelComponent
    label="Test Label"
    required={false}
    referenceId={null}
    disabled={false}
    error={false}
  />
)

describe('Label component', () => {
  it('Should render in virtual DOM', () => {
    const { getByTestId } = render(defaultLabel)
    expect(getByTestId('label-component')).toBeInTheDocument()
  })

  it('Should shot the snapshot with all properties', () => {
    const component = renderer.create(defaultLabel)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })
})

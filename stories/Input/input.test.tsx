import * as renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { inputDefault } from './fixture/inputFixture'

describe('InputComponent test', () => {
  it('Should take the snapshot with require props', () => {
    const component = renderer.create(inputDefault)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })

  it('Should render input in virtual DOM', () => {
    const { getByTestId } = render(inputDefault)
    expect(getByTestId('input-component')).toBeInTheDocument()
  })

  // it('The Input should be of text type', () => {
  //   const component = renderer.create(inputDefault)
  //   const componentJSON = component.getInstance()
  //   const inputComponentTextType = renderer.create(
  //     <InputComponent
  //       value="text"
  //       data-testid="input-component"
  //       onChangeValue={(): null => null}
  //       id="input"
  //       type="text"
  //     />
  //   )
  //   const inputComponentTextTypeJSON = inputComponentTextType.toJSON()
  //   console.log(componentJSON)
  //   console.log(inputComponentTextTypeJSON)
  //   expect(componentJSON).toMatchObject(inputComponentTextTypeJSON)
  // })
})

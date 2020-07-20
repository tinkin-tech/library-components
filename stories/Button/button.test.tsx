import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Button from './Button';

describe('Button test', () => {
  it('Should take snapshot of button component with all require properties',
     async () => {
    const component = renderer.create(
      <Button
        type="danger"
        disable={false}
        text="Boton de prueba"
        action={null}
        typeButton="border"
        />
    )
    let componentJSON = component.toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
  it('Should call action function one time when click button', async () => {
    const action = jest.fn(() => null);
    render(<Button type="danger" disable={false} text="Boton de prueba" action={action} typeButton="border" />);
    fireEvent.click(screen.getByTestId('button-component'));
    expect(action).toBeCalledTimes(1);
  });
});

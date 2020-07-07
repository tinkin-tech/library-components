import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from './Button';

describe('Button test', () => {
  it('Should take snapshot of button component with all require properties', async () => {
    const component = renderer.create(<Button type="danger" disable={false} text="Boton de prueba" action={null} typeButton="border" />);
    let componentJSON = component.toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});

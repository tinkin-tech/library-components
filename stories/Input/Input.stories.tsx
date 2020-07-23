import * as React from 'react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'

import InputComponent, { IInputTypes } from './Input'

export default {
  title: 'Input',
  component: InputComponent,
  decorators: [withKnobs],
}

export const Input = (): React.ReactNode => {
  const selectOptions: { [name in IInputTypes]: IInputTypes } = {
    text: 'text',
    number: 'number',
    password: 'password',
    email: 'email',
  }
  const inputComponent: JSX.Element = (
    <InputComponent
      id="input"
      value={text('Value', '')}
      onChangeValue={(): null => null}
      type={select<IInputTypes>('Type', selectOptions, 'text')}
      placeholder={text('Placeholder', '')}
      label={boolean('Label', true) ? text('Value label', 'Label') : ''}
      required={boolean('Required', false)}
      disable={boolean('disable', false)}
      error={boolean('Error', false) ? text('Value error', 'Error') : ''}
    />
  )
  return (
    <div className="input-story">
      <h1 className="title-text">Input</h1>
      <div className="separate" />
      <div className="import-content">
        <h3>Import</h3>
        <div className="box-code-content">
          <code className="language-js">
            {`import { Input } from 'tinkin-components';`}
          </code>
        </div>
      </div>
      <div className="separate" />
      <div className="component-content">
        <h3>Component</h3>
        <div className="box-code-content">
          <div className="box-input-content">
            <h4>Interactive with addons</h4>
            <div className="box-input-code-content">
              <div className="input-content">{inputComponent}</div>
              <div className="code-content">
                <div className="box-code-content">
                  <pre>
                    <code>
                      <span>{`<InputComponent`}</span>
                      <span>{` id="input"`}</span>
                      <span>{` value="${inputComponent.props.value}"`}</span>
                      <span>{` onChangeValue={(): null => null}`}</span>
                      <span>{` type="${inputComponent.props.type}"`}</span>
                      {inputComponent.props.placeholder && (
                        <span>
                          {` placeholder="${inputComponent.props.placeholder}"`}
                        </span>
                      )}
                      {inputComponent.props.label && (
                        <span>{` label="${inputComponent.props.label}"`}</span>
                      )}
                      {inputComponent.props.required && (
                        <span>
                          {` required={${inputComponent.props.required}}`}
                        </span>
                      )}
                      {inputComponent.props.disable && (
                        <span>
                          {` disable={${inputComponent.props.disable}}`}
                        </span>
                      )}
                      {inputComponent.props.error && (
                        <span>{` error="${inputComponent.props.error}"`}</span>
                      )}
                      <span>{`/>`}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="separate" />
      <div className="propsTypes-content">
        <h3>Prop Types</h3>
        <div className="props-content-row">
          <h5 className="prop-column">Property</h5>
          <h5 className="prop-column">PropType</h5>
          <h5 className="prop-column">Required</h5>
          <h5 className="prop-column">Default</h5>
          <h5 className="prop-column">Description</h5>
        </div>
        <div className="props-content-row">
          <span>id</span>
          <span>string</span>
          <span>yes</span>
          <span>{`''`}</span>
          <span>The id of the input</span>
        </div>
        <div className="props-content-row">
          <span>value</span>
          <span>string</span>
          <span>yes</span>
          <span>{`''`}</span>
          <span>The value of the input</span>
        </div>
        <div className="props-content-row">
          <span>onChangeValue</span>
          <span>function</span>
          <span>yes</span>
          <span>{''}</span>
          <span>
            function that receives id and value when a change is made to the
            input
          </span>
        </div>
        <div className="props-content-row">
          <span>type</span>
          <span>{`'text' | 'email' | 'number' | 'password'`}</span>
          <span>yes</span>
          <span>{'text'}</span>
          <span>The type of the input</span>
        </div>
        <div className="props-content-row">
          <span>label</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>The label of the input</span>
        </div>
        <div className="props-content-row">
          <span>required</span>
          <span>boolean</span>
          <span>no</span>
          <span>false</span>
          <span>It represented by an asterisk if required the input</span>
        </div>
        <div className="props-content-row">
          <span>placeholder</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>Text displayed when there is no value</span>
        </div>
        <div className="props-content-row">
          <span>error</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>
            Value that represents an error, when entering a value an error style
            is shown in the input
          </span>
        </div>
        <div className="props-content-row">
          <span>disable</span>
          <span>boolean</span>
          <span>no</span>
          <span>false</span>
          <span>
            When the value is true it shows an opaque style and some value
            cannot be entered in the input
          </span>
        </div>
      </div>
    </div>
  )
}

import * as React from 'react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Highlight from 'react-highlight'

import InputComponent, { IInputTypes, ILabelPositionTypes } from './Input'

export default {
  title: 'Input',
  component: InputComponent,
  decorators: [withKnobs],
}

export const Input = (): React.ReactNode => {
  const selectOptionsInputType: { [name in IInputTypes]: IInputTypes } = {
    text: 'text',
    number: 'number',
    password: 'password',
    email: 'email',
  }
  const selectOptionsLabelPosition: {
    [name in ILabelPositionTypes]: ILabelPositionTypes
  } = {
    outside: 'outside',
    inside: 'inside',
  }
  const inputComponent: JSX.Element = (
    <InputComponent
      id="input"
      value={text('Value', '')}
      onChangeValue={action('Change value')}
      type={select<IInputTypes>('Type', selectOptionsInputType, 'text')}
      placeholder={text('Placeholder', '')}
      label={
        boolean('Label', true) && {
          label: text('Label value', 'Label'),
          labelPosition: select<ILabelPositionTypes>(
            'Label position',
            selectOptionsLabelPosition,
            'inside'
          ),
        }
      }
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
        <Highlight className="JavaScript box-code-content">
          {`import { InputComponent } from 'tinkin-components'`}
        </Highlight>
      </div>
      <div className="separate" />
      <div className="component-content">
        <h3>Componente</h3>
        <div className="box-code-content">
          <div className="box-input-content">
            <h4>Interactividad con complementos</h4>
            <div className="box-input-code-content">
              <div className="input-content">{inputComponent}</div>
              <div className="code-content">
                <div className="JavaScript box-code-content">
                  <pre>
                    <code>
                      <span>{`<InputComponent`}</span>
                      <span>{` id="input"`}</span>
                      <span>{` value="${inputComponent.props.value}"`}</span>
                      {/* eslint-disable-next-line max-len */}
                      <span>{` onChangeValue={(id, value): null => null}`}</span>
                      <span>{` type="${inputComponent.props.type}"`}</span>
                      {inputComponent.props.placeholder && (
                        <span>
                          {` placeholder="${inputComponent.props.placeholder}"`}
                        </span>
                      )}
                      {inputComponent.props.label && <span>{` label={{`}</span>}
                      {inputComponent.props.label && (
                        // eslint-disable-next-line max-len
                        <span>{`  label="${inputComponent.props.label.label}",`}</span>
                      )}
                      {inputComponent.props.label && (
                        // eslint-disable-next-line max-len
                        <span>{`  labelPosition="${inputComponent.props.label.labelPosition}",`}</span>
                      )}
                      {inputComponent.props.label && <span>{` }}`}</span>}
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
        <h3>Propiedades</h3>
        <div className="props-content-row">
          <h5 className="prop-column">Propiedad</h5>
          <h5 className="prop-column">Tipo</h5>
          <h5 className="prop-column">Requerido</h5>
          <h5 className="prop-column">Valor por Defecto</h5>
          <h5 className="prop-column">Descripción</h5>
        </div>
        <div className="props-content-row">
          <span>id</span>
          <span>string</span>
          <span>si</span>
          <span>{`''`}</span>
          <span>Id del Input</span>
        </div>
        <div className="props-content-row">
          <span>value</span>
          <span>string</span>
          <span>si</span>
          <span>{`''`}</span>
          <span>Valor del Input</span>
        </div>
        <div className="props-content-row">
          <span>onChangeValue</span>
          <span>function</span>
          <span>si</span>
          <span>{''}</span>
          <span>
            Función que recibe (id, value) cuando se realiza un cambio en la
            entrada(Input)
          </span>
        </div>
        <div className="props-content-row">
          <span>type</span>
          <span>{`'text' | 'email' | 'number' | 'password'`}</span>
          <span>si</span>
          <span>{'text'}</span>
          <span>Tipo del Input</span>
        </div>
        <div className="props-content-row">
          <span>label</span>
          <span>object</span>
          <span>no</span>
          <span />
          <span>Objeto que contiene Label y LabelPosition</span>
        </div>
        <div className="props-content-row dependent">
          <span className="label">label</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>Etiqueta(label) del Input</span>
        </div>
        <div className="props-content-row dependent">
          <span className="label">labelPosition</span>
          <span>{`'outside' | 'inside'`}</span>
          <span>no</span>
          <span>{`'inside'`}</span>
          <span>La posición de la etiqueta(label) del Input</span>
        </div>
        <div className="props-content-row">
          <span>required</span>
          <span>boolean</span>
          <span>no</span>
          <span>false</span>
          <span>
            Se representa con un asterisco si la entrada(Input) es requerido
          </span>
        </div>
        <div className="props-content-row">
          <span>placeholder</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>Texto mostrado cuando no hay valor en la entrada(Input)</span>
        </div>
        <div className="props-content-row">
          <span>error</span>
          <span>string</span>
          <span>no</span>
          <span>{`''`}</span>
          <span>
            Valor que representa un error. Al ingresar un valor un estilo error
            se muestra en la entrada, junto al valor que ingrese en la propiedad
            error
          </span>
        </div>
        <div className="props-content-row">
          <span>disable</span>
          <span>boolean</span>
          <span>no</span>
          <span>false</span>
          <span>
            Cuando el valor es verdadero, muestra un estilo opaco en el
            componente y el valor no se puede ingresar en la entrada.
          </span>
        </div>
      </div>
    </div>
  )
}

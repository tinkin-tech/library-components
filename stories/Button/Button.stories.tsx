import * as React from 'react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

export const Active = (): React.ReactNode => {
  return <Button text="Click" action={action('clicked')} type="primary" />
}

export const Disable = (): React.ReactNode => (
  <Button
    text="Click"
    action={action('clicked')}
    type="primary"
    disable={true}
  />
)

export const stylesButton = (): React.ReactNode => (
  <div id="group-buttons">
    <div className="p-b-lg">
      <div className="size-5">Small</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="small"
      />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Text</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="text"
      />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Border</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="border"
      />
    </div>
  </div>
)

export const typesButton = (): React.ReactNode => (
  <div id="group-buttons">
    <div className="p-b-lg">
      <div className="size-5">Primary</div>
      <Button text="Click" action={action('clicked')} type="primary" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Danger</div>
      <Button text="Click" action={action('clicked')} type="danger" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Info</div>
      <Button text="Click" action={action('clicked')} type="info" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">White</div>
      <Button text="Click" action={action('clicked')} type="white" />
    </div>
  </div>
)

export const withIcon = (): React.ReactNode => {
  return <Button text="Click" action={action('clicked')} type="primary" />
}

export const withIconDisable = (): React.ReactNode => (
  <Button
    text="Click"
    action={action('clicked')}
    type="primary"
    disable={true}
  />
)

export const withIconStylesButton = (): React.ReactNode => (
  <div id="group-buttons">
    <div className="p-b-lg">
      <div className="size-5">Small with icon</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="small"
      />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Text with icon</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="text"
      />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Border with icon</div>
      <Button
        text="Click"
        action={action('clicked')}
        type="primary"
        typeButton="border"
      />
    </div>
  </div>
)

export const withIconTypesButton = (): React.ReactNode => (
  <div id="group-buttons">
    <div className="p-b-lg">
      <div className="size-5">Primary</div>
      <Button text="Click" action={action('clicked')} type="primary" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Danger</div>
      <Button text="Click" action={action('clicked')} type="danger" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">Info</div>
      <Button text="Click" action={action('clicked')} type="info" />
    </div>
    <div className="p-b-lg">
      <div className="size-5">White</div>
      <Button text="Click" action={action('clicked')} type="white" />
    </div>
  </div>
)

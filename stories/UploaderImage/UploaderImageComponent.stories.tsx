import * as React from 'react'
import UploaderImageComponent, {
  IUploaderImageComponent,
} from './UploaderImageComponent'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Uploder Image',
  component: UploaderImageComponent,
}

const Template = (args: IUploaderImageComponent): JSX.Element => (
  <UploaderImageComponent {...args} />
)

export const Default: { args: IUploaderImageComponent } = Template.bind({})

export const WithoutImage: { args: IUploaderImageComponent } = Template.bind({})

export const Error: { args: IUploaderImageComponent } = Template.bind({})

const valueImage =
  'https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg'

Default.args = {
  value: valueImage,
  valueId: '',
  keyFormData: '',
  deleteAction: action('deleteAction'),
  onUploadImage: action('onUploadImage'),
  error: '',
  label: 'Uploader',
  maxSize: 0,
  required: false,
  filesAccepted: ['jpg', 'png', 'jpeg'],
  labelClassName: '',
  extraLabelClassName: '',
}

WithoutImage.args = {
  onUploadImage: action('onUploadImage'),
  deleteAction: action('deleteAction'),
  keyFormData: '',
  value: '',
  valueId: '',
  error: '',
  label: 'Uploader',
  maxSize: 30,
  required: true,
  filesAccepted: ['jpeg'],
  labelClassName: '',
  extraLabelClassName: '',
}

Error.args = {
  value: '',
  valueId: '',
  keyFormData: '',
  deleteAction: action('deleteAction'),
  onUploadImage: action('onUploadImage'),
  error: 'error uploader default text',
  label: 'Uploader',
  maxSize: 40,
  required: false,
  labelClassName: '',
  extraLabelClassName: '',
}

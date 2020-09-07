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

const valueImage = 'https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg'

Default.args = {
  value: valueImage,
  valueId: '',
  keyFormData: '',
  deleteAction: action('deleteAction'),
  onUploadImage: action('onUploadImage'),
  error: '',
  label: '',
  maxSize: 0,
  required: false,
  filesAccepted: ['jpg', 'png', 'jpeg'],
  labelClassName: '',
  extraLabelClassName: '',
}

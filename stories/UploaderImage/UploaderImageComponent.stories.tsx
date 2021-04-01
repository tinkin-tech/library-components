import * as React from 'react'
import { action } from '@storybook/addon-actions'

import {
  UploaderImageComponent,
  IUploaderImageComponent,
} from './UploaderImageComponent'

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

export const MultipleUploader: {
  args: IUploaderImageComponent
} = Template.bind({})

export const CustomUploaderContent: {
  args: IUploaderImageComponent
} = Template.bind({})

const valueImage =
  'https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/' +
  'main-700b9bff30.jpeg'

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

MultipleUploader.args = {
  value: '',
  valueId: '',
  keyFormData: '',
  deleteAction: action('deleteAction'),
  onUploadImage: action('onUploadImage'),
  error: '',
  label: 'Uploader',
  maxSize: 40,
  required: false,
  labelClassName: '',
  extraLabelClassName: '',
  changeValues: action('changeValues'),
  isMultiple: true,
  values: [
    'https://upload.wikimedia.org/wikipedia/commons/9/90/Spiderman.JPG',
    'https://i1.wp.com/elsolnewsmedia.com/wp-content/uploads/2020/10/1601498876_582320_1601498920_noticia_normal.jpg',
  ],
  removeImageIcon: <div>Eliminar</div>,
  width: '500px',
}

CustomUploaderContent.args = {
  value: '',
  valueId: '',
  keyFormData: '',
  deleteAction: action('deleteAction'),
  onUploadImage: action('onUploadImage'),
  error: '',
  label: 'Uploader',
  maxSize: 40,
  required: false,
  labelClassName: '',
  extraLabelClassName: '',
  customUploaderContent: (
    <div>
      Arrastra tus imágenes aquí para cargarlas, o haz click aquí para explorar
    </div>
  ),
}

import * as React from 'react'
import GalleryComponent, { IGalleryComponent } from './GalleryComponent'

export default {
  title: 'Gallery',
  component: GalleryComponent,
}

const Template = (args: IGalleryComponent): React.ReactElement => (
  <GalleryComponent {...args} />
)

export const Default: { args: IGalleryComponent } = Template.bind({})

const galleryProps: IGalleryComponent = {
  imageList: [
    {
      image: 'https://tinkin.one/images/about.png',
      thumbnail: 'https://tinkin.one/images/about.png',
      title: 'Tinkin 1',
    },
    {
      image: 'https://tinkin.one/images/about.png',
      thumbnail: 'https://tinkin.one/images/about.png',
      title: 'Tinkin 2',
    },
    {
      image: 'https://tinkin.one/images/about.png',
      thumbnail: 'https://tinkin.one/images/about.png',
      link: 'https://www.tinkin.one',
    },
  ],
  width: '400px',
  height: '300px',
}

Default.args = {
  ...galleryProps,
}

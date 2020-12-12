import * as React from 'react'

import { GalleryComponent, IGalleryComponent } from './GalleryComponent'

export default {
  title: 'Gallery',
  component: GalleryComponent,
}

const Template = (args: IGalleryComponent): React.ReactElement => (
  <GalleryComponent {...args} />
)

export const Default: { args: IGalleryComponent } = Template.bind({})
export const Categories: { args: IGalleryComponent } = Template.bind({})

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

const galleryPropsWithCategories: IGalleryComponent = {
  imageList: [
    {
      image: 'https://tinkin.one/images/services/software_develop.jpg',
      thumbnail: 'https://tinkin.one/images/services/software_develop.jpg',
      category: 'Category 1',
    },
    {
      image: 'https://tinkin.one/images/services/mobile_app.jpg',
      thumbnail: 'https://tinkin.one/images/services/mobile_app.jpg',
      category: 'Category 2',
    },
    {
      image: 'https://tinkin.one/images/services/ux.jpg',
      thumbnail: 'https://tinkin.one/images/services/ux.jpg',
      category: 'Category 1',
    },
  ],
  width: '400px',
  height: '300px',
  showCategoryFilter: true,
  bulletType: 'thumbnails',
  autoPlayInterval: 4000,
}

Default.args = {
  ...galleryProps,
}

Categories.args = {
  ...galleryPropsWithCategories,
}

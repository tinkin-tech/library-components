import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils'

import { GalleryComponent } from './GalleryComponent'

describe('Render component <GalleryComponent/>', () => {
  const imageListMock = [
    {
      image: 'image1.jpg',
      thumbnail: 'image1_tm.jpg',
      link: 'https://www.tinkin.one',
      title: 'Image Title 1',
    },
    {
      image: 'image2.jpg',
      thumbnail: 'image2_tm.jpg',
      title: 'Image Title 2',
    },
  ]

  const imageListWithCategoriesMock = [
    {
      image: 'image4.jpg',
      thumbnail: 'image4_tm.jpg',
      category: 'Exterior',
    },
    {
      image: 'image5.jpg',
      thumbnail: 'image5_tm.jpg',
      category: 'Exterior',
    },
    {
      image: 'image6.jpg',
      thumbnail: 'image6_tm.jpg',
      category: 'Interior',
    },
    {
      image: 'image7.jpg',
      thumbnail: 'image7_tm.jpg',
      category: 'Exterior',
    },
  ]

  describe('When it receives a images list', () => {
    it('Should show the same number of images than passed to it', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(container.querySelectorAll('.gallery-item')).toHaveLength(2)
    })

    it('Should open a link when the image has the link property', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(
        container.querySelectorAll('.gallery-item')[0].closest('a')
      ).toHaveAttribute('href', 'https://www.tinkin.one')
      expect(
        container.querySelectorAll('.gallery-item')[1].closest('a')
      ).not.toBeInTheDocument()
    })

    it(`Shouldn't show thumbnails or arrows when only have 1 image`, () => {
      const { container } = render(
        <GalleryComponent
          imageList={[imageListMock[0]]}
          bulletType="thumbnails"
        />
      )
      expect(container.querySelector('.gallery-arrow-nav')).toBeNull()
      expect(container.querySelector('.gallery-thumbnails')).toBeNull()
    })
  })

  describe('When it receives a target', () => {
    it('Should open link in new tab when target is blank and has link', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} target="_blank" />
      )
      expect(
        container.querySelectorAll('.gallery-item')[0].closest('a')
      ).toHaveAttribute('target', '_blank')
    })

    it(`Should open a link in the same tab when target is self or it does
    not have this prop`, () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(
        container.querySelectorAll('.gallery-item')[0].closest('a')
      ).toHaveAttribute('target', '_self')
    })
  })

  describe('When it receives bullet type', () => {
    it('Should show bullets when value is equals bullets', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="bullets" />
      )
      expect(
        container.querySelectorAll('.gallery-bullets .button-bullet')
      ).toHaveLength(2)
    })

    it('Should show thumbnails when value is equals thumbnails', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="thumbnails" />
      )
      expect(
        container.querySelectorAll('.gallery-thumbnails .button-thumbnails')
      ).toHaveLength(2)
      expect(
        container
          .querySelectorAll('.gallery-thumbnails .button-thumbnails')[0]
          .getAttribute('style')
      ).toEqual('background-image: url(image1_tm.jpg);')
    })

    it(`Shouldn't show thumbnails when do not have the prop`, () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(container.querySelector('.gallery-thumbnails')).toBeNull()
      expect(container.querySelector('.gallery-bullets')).toBeNull()
    })

    it('Should activate image from thumbnail', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="thumbnails" />
      )
      fireEvent.click(container.querySelectorAll('.gallery-thumbnails a')[1])
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -100%;')
    })

    it('Should activate image from bullet', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="bullets" />
      )
      fireEvent.click(container.querySelectorAll('.gallery-bullets a')[1])
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -100%;')
    })
  })

  describe('When change gallery to full screen', () => {
    it('Should show default gallery when render', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(container.children[0].className).not.toContain(
        'full-screen-gallery'
      )
      expect(container.querySelector('.icon-close')).toBeNull()
    })

    it('Should show fullScreen when click on image and don`t have link', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      fireEvent.click(container.querySelectorAll('.gallery-item')[1])
      expect(container.children[0].className).toContain('full-screen-gallery')
      expect(container.querySelector('.icon-close')).toBeInTheDocument()
    })

    it(`Shouldn't show full screen gallery when have disableFullScreen`, () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} disableFullScreen={true} />
      )
      fireEvent.click(container.querySelectorAll('.gallery-item')[1])
      expect(container.children[0].className).not.toContain(
        'full-screen-gallery'
      )
    })

    it('Should show default gallery when click on close button', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      fireEvent.click(container.querySelectorAll('.gallery-item')[1])
      fireEvent.click(container.querySelector('.icon-close'))
      expect(container.children[0].className).not.toContain(
        'full-screen-gallery'
      )
    })
  })

  describe('When show arrows nav', () => {
    it('Should show arrows when don`t have hideArrows', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(container.querySelector('.gallery-arrow-nav')).toBeInTheDocument()
    })

    it('Should hide arrows when have hideArrows', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} hideArrows={true} />
      )
      expect(container.querySelector('.gallery-arrow-nav')).toBeNull()
    })

    it('Should change to the last image when the active image is the first one and prev is clicked', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="thumbnails" />
      )
      fireEvent.click(
        container.querySelectorAll('.gallery-thumbnails .button-thumbnails')[0]
      )
      fireEvent.click(container.querySelector('.arrow-prev'))
      expect(
        container.querySelector('.gallery-item.active').getAttribute('style')
      ).toEqual('background-image: url(image2.jpg);')
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -100%;')
    })

    it('Should activate next image when click on next arrow', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -0%;')
      expect(
        container.querySelectorAll('.gallery-item')[0].className
      ).toContain('active')
      fireEvent.click(container.querySelector('.arrow-next'))
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -100%;')
      expect(
        container.querySelectorAll('.gallery-item')[0].className
      ).not.toContain('active')
      expect(
        container.querySelectorAll('.gallery-item')[1].className
      ).toContain('active')
    })

    it('Should activate prev image when click on prev arrow', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      fireEvent.click(container.querySelector('.arrow-next'))
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -100%;')
      expect(
        container.querySelectorAll('.gallery-item')[1].className
      ).toContain('active')
      fireEvent.click(container.querySelector('.arrow-prev'))
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -0%;')
      expect(
        container.querySelectorAll('.gallery-item')[1].className
      ).not.toContain('active')
      expect(
        container.querySelectorAll('.gallery-item')[0].className
      ).toContain('active')
    })

    it('Should change to the first image when the active image is the last one and next is clicked', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} bulletType="thumbnails" />
      )
      fireEvent.click(
        container.querySelectorAll('.gallery-thumbnails .button-thumbnails')[1]
      )
      fireEvent.click(container.querySelector('.arrow-next'))
      expect(
        container.querySelector('.gallery-item.active').getAttribute('style')
      ).toEqual('background-image: url(image1.jpg);')
      expect(
        container.querySelector('.gallery-block').getAttribute('style')
      ).toEqual('left: -0%;')
    })
  })

  describe('When it receives width and height', () => {
    it('Should set styles width and height', () => {
      const { container } = render(
        <GalleryComponent
          imageList={imageListMock}
          width="20px"
          height="20px"
        />
      )
      expect(
        container.querySelector('.gallery-component').getAttribute('style')
      ).toEqual('width: 20px;')
      expect(
        container.querySelector('.gallery-scroll-area').getAttribute('style')
      ).toEqual('width: 20px; height: 20px;')
    })

    it('Should set default width and height when don`t have props', () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} />
      )
      expect(
        container.querySelector('.gallery-component').getAttribute('style')
      ).toEqual('width: 100%;')
      expect(
        container.querySelector('.gallery-scroll-area').getAttribute('style')
      ).toEqual('width: 100%; height: 250px;')
    })
  })

  describe('When it receives gallery link text', () => {
    it('Should display text instead of images', () => {
      const { container, queryByText } = render(
        <GalleryComponent
          imageList={imageListMock}
          width="20px"
          height="20px"
          galleryLinkText="View Gallery"
        />
      )
      expect(queryByText('View Gallery')).toBeInTheDocument()
      expect(container.querySelectorAll('img')).toHaveLength(0)
    })

    it('Should show the gallery in full screen when clicking the link text', () => {
      const { container, queryByText } = render(
        <GalleryComponent
          imageList={imageListMock}
          width="20px"
          height="20px"
          galleryLinkText="View Gallery"
        />
      )
      fireEvent.click(queryByText('View Gallery'))
      expect(queryByText('View Gallery')).not.toBeInTheDocument()
      expect(container.querySelector('.gallery-component')).toBeInTheDocument()
    })

    it('Should add class in link text when it receives linkTextClassName ', () => {
      const { container } = render(
        <GalleryComponent
          imageList={imageListMock}
          width="20px"
          height="20px"
          galleryLinkText="View Gallery"
          linkTextClassName="extra-class"
        />
      )
      expect(container.querySelector('a.extra-class')).toBeInTheDocument()
    })

    it('Should open link in new tab when image item target is blank and has link ', () => {
      const { container } = render(
        <GalleryComponent
          imageList={[
            ...imageListMock,
            {
              image: 'image3.jpg',
              link: 'https://www.tinkin.one',
              thumbnail: 'image3_tm.jpg',
              title: 'Image Title 3',
              target: '_blank',
            },
          ]}
          target={'_self'}
        />
      )
      expect(
        container.querySelectorAll('.gallery-item')[2].closest('a')
      ).toHaveAttribute('target', '_blank')
    })
  })

  describe('When it receives categories filter', () => {
    it('Should show category navigation if it have items with category prop', () => {
      const { container } = render(
        <GalleryComponent
          imageList={imageListWithCategoriesMock}
          showCategoryFilter={true}
        />
      )
      expect(container.querySelector('.categories-filter')).toBeInTheDocument()
      expect(container.querySelectorAll('.category-tab')).toHaveLength(3)
      expect(
        container.querySelectorAll('.category-tab')[0].classList
      ).toContain('active')
    })

    it("Should hide category navigation if it don't have items with category property", () => {
      const { container } = render(
        <GalleryComponent imageList={imageListMock} showCategoryFilter={true} />
      )
      expect(
        container.querySelector('.categories-filter')
      ).not.toBeInTheDocument()
    })

    it('Should filter images by category when clicking on it', () => {
      const { container } = render(
        <GalleryComponent
          imageList={imageListWithCategoriesMock}
          showCategoryFilter={true}
        />
      )
      expect(container.querySelectorAll('.gallery-item')).toHaveLength(4)
      fireEvent.click(container.querySelectorAll('.category-tab')[1])
      expect(container.querySelectorAll('.gallery-item')).toHaveLength(3)
      fireEvent.click(container.querySelector('.arrow-next'))
      fireEvent.click(container.querySelectorAll('.category-tab')[2])
      expect(container.querySelectorAll('.gallery-item')).toHaveLength(1)
      expect(
        container.querySelector('.gallery-item.active').getAttribute('style')
      ).toEqual('background-image: url(image6.jpg);')
    })
  })

  describe('When it receives auto play interval', () => {
    it('Should switch to the next image after the time interval', async () => {
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <GalleryComponent imageList={imageListMock} autoPlayInterval={2000} />
        )
        jest.advanceTimersByTime(3000)
      })
      expect(
        component.container
          .querySelector('.gallery-block')
          .getAttribute('style')
      ).toEqual('left: -100%;')
      expect(
        component.container.querySelectorAll('.gallery-item')[1].className
      ).toContain('active')
    })
  })
})

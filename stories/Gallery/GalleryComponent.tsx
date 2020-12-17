import * as React from 'react'

import es_EC from './language/es_EC'

interface IGalleryImage {
  image: string
  thumbnail?: string
  link?: string
  title?: string
  target?: '_self' | '_blank'
  category?: string
}

export interface IGalleryComponent {
  imageList: Array<IGalleryImage>
  target?: '_self' | '_blank'
  bulletType?: 'bullets' | 'thumbnails'
  hideArrows?: boolean
  width?: string
  height?: string
  disableFullScreen?: boolean
  galleryLinkText?: string
  linkTextClassName?: string
  showCategoryFilter?: boolean
  autoPlayInterval?: number
}

export const GalleryComponent = (props: IGalleryComponent): JSX.Element => {
  const {
    imageList,
    target,
    bulletType,
    hideArrows,
    height,
    width,
    disableFullScreen,
    galleryLinkText,
    linkTextClassName,
    showCategoryFilter,
    autoPlayInterval,
  } = props
  const [activeCategory, changeActiveCategory] = React.useState(es_EC.ALL)
  const [activeImage, changeActiveImage] = React.useState(1)
  const [fullScreen, toggleFullScreen] = React.useState(false)
  const imageCategories = imageList.reduce(
    (accumulator, value) =>
      value.category && !accumulator.includes(value.category)
        ? [...accumulator, value.category]
        : accumulator,
    []
  )
  const filterList =
    showCategoryFilter && activeCategory !== es_EC.ALL
      ? imageList.filter((image) => image.category === activeCategory)
      : imageList
  const getBullets = (): JSX.Element => {
    switch (bulletType) {
      case 'bullets':
        return (
          <div className="gallery-bullets">
            {filterList.map((_, key) => (
              <a
                onClick={(): void => changeActiveImage(key + 1)}
                key={key}
                className={`button-bullet ${
                  activeImage === key + 1 && 'active'
                }`}
              />
            ))}
          </div>
        )
      case 'thumbnails':
        return (
          <div className="gallery-thumbnails">
            {filterList.map((bl, key) => (
              <a
                onClick={(): void => changeActiveImage(key + 1)}
                key={key}
                className={`button-thumbnails ${
                  activeImage === key + 1 && 'active'
                }`}
                style={{ backgroundImage: `url(${bl.thumbnail})` }}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }
  const navValues = {
    activePrev: activeImage > 1,
    activeNext: activeImage < filterList.length,
  }
  const nextImage = (): void => {
    changeActiveImage(navValues.activeNext ? activeImage + 1 : 1)
  }
  const prevImage = (): void => {
    changeActiveImage(
      navValues.activePrev ? activeImage - 1 : filterList.length
    )
  }
  const changeCategory = (category: string): void => {
    changeActiveCategory(category)
    changeActiveImage(1)
  }
  const galleryStyles = {
    width: width || '100%',
    height: height || '250px',
  }
  const leftPercentPosition = 100
  React.useEffect(() => {
    if (autoPlayInterval) {
      const interval = setInterval(nextImage, autoPlayInterval)
      return (): void => clearInterval(interval)
    }
  }, [activeImage])
  if (galleryLinkText && !fullScreen) {
    return (
      <a
        className={`${linkTextClassName || ''}`}
        onClick={(): void => toggleFullScreen(true)}
      >
        {galleryLinkText}
      </a>
    )
  }
  return (
    <div
      className={`gallery-component ${fullScreen && 'full-screen-gallery'}`}
      style={{ width: galleryStyles.width }}
    >
      {fullScreen && (
        <a
          onClick={(): void => toggleFullScreen(false)}
          className="close-button"
        >
          <i className="icon-close" />
        </a>
      )}
      {showCategoryFilter && imageCategories.length && (
        <ul className="categories-filter">
          {[es_EC.ALL, ...imageCategories].map((category, key) => (
            <li
              className={`${
                category === activeCategory && 'active'
              } category-tab`}
              key={key}
              onClick={(): void => changeCategory(category)}
            >
              <a>{category}</a>
            </li>
          ))}
        </ul>
      )}
      <div className="gallery-scroll-area" style={galleryStyles}>
        {!hideArrows && filterList.length > 1 && (
          <div className="gallery-arrow-nav">
            <a
              onClick={prevImage}
              className={`arrow-prev ${!navValues.activePrev && 'disable'}`}
            >
              <i className="icon-arrow-left icon-24 text-primary" />
            </a>
            <a
              onClick={nextImage}
              className={`arrow-next ${!navValues.activeNext && 'disable'}`}
            >
              <i className="icon-arrow-right icon-24 text-primary" />
            </a>
          </div>
        )}
        <div
          className="gallery-block"
          style={{ left: `-${(activeImage - 1) * leftPercentPosition}%` }}
        >
          {filterList.map((image, key) => {
            const imageProps = {
              key,
              className: `gallery-item ${activeImage === key + 1 && 'active'}`,
              style: {
                backgroundImage: `url(${image.image})`,
              },
            }
            const slideContent = !!image.title && (
              <span className="top-content">
                <span className="title-text">{image.title}</span>
              </span>
            )
            return image.link ? (
              <a
                {...imageProps}
                href={image.link}
                target={image.target || target || '_self'}
              >
                {slideContent}
              </a>
            ) : (
              <div
                {...imageProps}
                onClick={(): void =>
                  !disableFullScreen && toggleFullScreen(true)
                }
              >
                {slideContent}
              </div>
            )
          })}
        </div>
      </div>
      {filterList.length > 1 && getBullets()}
    </div>
  )
}

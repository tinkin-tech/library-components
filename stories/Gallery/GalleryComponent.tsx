import * as React from 'react'

interface IGalleryImage {
  image: string
  thumbnail?: string
  link?: string
  title?: string
}

export interface IGalleryComponent {
  imageList: Array<IGalleryImage>
  target?: '_self' | '_blank'
  bulletType?: 'bullets' | 'thumbnails'
  hideArrows?: boolean
  width?: string
  height?: string
  disableFullScreen?: boolean
}

const GalleryComponent = (props: IGalleryComponent): JSX.Element => {
  const {
    imageList,
    target,
    bulletType,
    hideArrows,
    height,
    width,
    disableFullScreen,
  } = props
  const [activeImage, changeActiveImage] = React.useState(1)
  const [fullScreen, toggleFullScreen] = React.useState(false)
  const getBullets = (): JSX.Element => {
    switch (bulletType) {
      case 'bullets':
        return (
          <div className="gallery-bullets">
            {imageList.map((_, key) => (
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
            {imageList.map((bl, key) => (
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
    activeNext: activeImage < imageList.length,
  }
  const galleryStyles = {
    width: width || '100%',
    height: height || '250px',
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
      <div className="gallery-scroll-area" style={galleryStyles}>
        {!hideArrows && imageList.length > 1 && (
          <div className="gallery-arrow-nav">
            <a
              onClick={(): void =>
                navValues.activePrev && changeActiveImage(activeImage - 1)
              }
              className={`arrow-prev ${!navValues.activePrev && 'disable'}`}
            >
              <i className="icon-arrow-left icon-24 text-primary" />
            </a>
            <a
              onClick={(): void =>
                navValues.activeNext && changeActiveImage(activeImage + 1)
              }
              className={`arrow-next ${!navValues.activeNext && 'disable'}`}
            >
              <i className="icon-arrow-right icon-24 text-primary" />
            </a>
          </div>
        )}
        <div
          className="gallery-block"
          style={{ left: `-${(activeImage - 1) * 100}%` }}
        >
          {imageList.map((image, key) => {
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
              <a {...imageProps} href={image.link} target={target || '_self'}>
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
      {imageList.length > 1 && getBullets()}
    </div>
  )
}

export default GalleryComponent

import * as React from 'react'

export interface ISliderCarouselComponent {
  transitionTime: number
  numberOfCards: number
  hidePrevButton?: boolean
  cards: JSX.Element[] | React.ReactNode[]
}

export const SliderCarouselComponent: React.FC<ISliderCarouselComponent> = (
  props: ISliderCarouselComponent
) => {
  let mountedComponent = true
  const { cards, numberOfCards, transitionTime, hidePrevButton } = props
  const [status, changeStatus] = React.useState({
    activeAuxStep: 0,
    activeAuxTransition: null,
    activeStep: 0,
    activeTransition: null,
    showAuxBlock: false,
    transitionInProgress: false,
  })
  const averageValue = 2
  const transitionSafeTime = 100
  const activeCarousel = numberOfCards < cards.length
  const itemsCount = activeCarousel ? numberOfCards : cards.length
  const totalWidthPercent = 100
  const firstAndLastItem = activeCarousel ? averageValue : 0
  const cardWidth = totalWidthPercent / numberOfCards
  const getLeftPosition = (): string => {
    let value = cardWidth
    switch (true) {
      case status.activeTransition === 'next':
        value = firstAndLastItem * cardWidth
        break
      case !activeCarousel:
      case status.activeTransition === 'prev':
        value = 0
        break
    }
    return `-${value}%`
  }
  const updateStatus = (statusValue): void => {
    if (!mountedComponent) {
      return null
    }
    changeStatus(statusValue)
  }
  const getCard = (key: number, auxCard: boolean): JSX.Element => {
    const totalCards = cards.length
    let cardItemKey = null
    if (!auxCard) {
      const cardKeyRef =
        status.activeStep + key - firstAndLastItem / averageValue
      cardItemKey = cardKeyRef < 0 ? totalCards - 1 : cardKeyRef
    } else {
      const cardAuxKeyRef = status.activeAuxStep + key
      if (status.activeAuxTransition === 'prev') {
        cardItemKey = cardAuxKeyRef > 0 ? cardAuxKeyRef - 1 : totalCards - 1
      } else {
        cardItemKey = cardAuxKeyRef + 1
      }
    }
    if (cardItemKey >= totalCards) {
      cardItemKey = cardItemKey - totalCards
    }
    const cardItem = cards[cardItemKey]
    return (
      <div
        key={`${key}-${auxCard ? 'a' : 'b'}`}
        className="card-block"
        style={{
          width: `${
            totalWidthPercent /
            (numberOfCards + (auxCard ? 0 : firstAndLastItem))
          }%`,
        }}
      >
        {cardItem}
      </div>
    )
  }
  const changeActiveCard = (actionType: 'next' | 'prev'): void => {
    if (!status.activeTransition && !status.showAuxBlock) {
      let newStatus = {
        ...status,
        activeAuxTransition: actionType,
        activeTransition: actionType,
        transitionInProgress: true,
      }
      updateStatus(newStatus)
      setTimeout(() => {
        newStatus = {
          ...newStatus,
          transitionInProgress: false,
          showAuxBlock: true,
        }
        updateStatus(newStatus)
        setTimeout(() => {
          let activeValue = null
          if (actionType === 'next') {
            activeValue =
              status.activeStep + 1 < cards.length ? status.activeStep + 1 : 0
          } else {
            activeValue =
              status.activeStep <= 0 ? cards.length - 1 : status.activeStep - 1
          }
          newStatus = {
            ...newStatus,
            activeTransition: null,
            activeStep: activeValue,
          }
          updateStatus(newStatus)
          setTimeout(() => {
            newStatus = {
              ...newStatus,
              showAuxBlock: false,
              activeAuxStep: newStatus.activeStep,
            }
            updateStatus(newStatus)
          }, transitionSafeTime)
        }, transitionSafeTime)
      }, transitionTime)
    }
  }
  const style = {
    marginLeft: getLeftPosition(),
    opacity: 1,
    transition: 'none',
    width: `${cardWidth * (numberOfCards + firstAndLastItem)}%`,
  }
  if (status.transitionInProgress) {
    style.transition = `margin ${transitionTime - transitionSafeTime}ms`
  }
  if (status.showAuxBlock && status.activeStep !== status.activeAuxStep) {
    style.opacity = 0
  }
  React.useEffect(() => {
    (): boolean => (mountedComponent = false)
  }, [])
  return (
    <div className="slider-carousel-component">
      {activeCarousel && (
        <>
          {!hidePrevButton && (
            <a
              className="nav-arrow left-button"
              onClick={(): void => changeActiveCard('prev')}
            >
              <i className="icon-arrow-left" />
            </a>
          )}
          <a
            className="nav-arrow right-button"
            onClick={(): void => changeActiveCard('next')}
          >
            <i className="icon-arrow-right" />
          </a>
        </>
      )}
      <div className="carouser-view-area">
        {activeCarousel && (
          <div
            className="width-100 aux-content"
            style={{ opacity: status.showAuxBlock ? 1 : 0 }}
          >
            {[...Array(numberOfCards).keys()].map((item) =>
              getCard(item, true)
            )}
          </div>
        )}
        <div
          className={`carousel-content ${
            status.transitionInProgress && 'active-transition'
          }`}
          style={style}
        >
          {[...Array(itemsCount + firstAndLastItem).keys()].map((item) =>
            getCard(item, false)
          )}
        </div>
      </div>
    </div>
  )
}

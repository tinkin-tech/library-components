import * as React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { SliderCarouselComponent } from './SliderCarouselComponent'

const cards = [
  <div key={1}>card1</div>,
  <div key={2}>card2</div>,
  <div key={3}>card3</div>,
  <div key={4}>card4</div>,
  <div key={5}>card5</div>,
  <div key={6}>card6</div>,
]

describe('Render component <SliderCarouselComponent />', () => {
  describe('When receive required prop', () => {
    it('Should add component class name to first element', () => {
      const { container } = render(
        <SliderCarouselComponent
          numberOfCards={4}
          cards={cards}
          transitionTime={1000}
        />
      )
      expect(container.firstElementChild.className).toMatch(
        'slider-carousel-component'
      )
      expect(
        container.querySelectorAll('.card-block')[0].getAttribute('style')
      ).toEqual('width: 25%;')
      expect(
        container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 0;')
      expect(
        container.querySelector('.carousel-content').getAttribute('style')
      ).toContain(
        'margin-left: -25%; opacity: 1; transition: none; width: 150%'
      )
    })

    it('Should show next and prev arrow if prop numberOfCards is less to total cards', () => {
      const { container } = render(
        <SliderCarouselComponent
          numberOfCards={5}
          cards={cards}
          transitionTime={1000}
        />
      )
      expect(container.querySelector('.icon-arrow-left')).toBeInTheDocument()
      expect(container.querySelector('.icon-arrow-right')).toBeInTheDocument()
    })

    it('Should hide next and prev arrow if total cards is less or equal to prop numberOfCards', () => {
      const { container } = render(
        <SliderCarouselComponent
          numberOfCards={6}
          cards={cards}
          transitionTime={1000}
        />
      )
      expect(container.querySelector('.icon-arrow-left')).toBeNull()
      expect(container.querySelector('.icon-arrow-right')).toBeNull()
      expect(container.querySelector('.aux-content')).toBeNull()
      expect(
        container.querySelector('.carousel-content').getAttribute('style')
      ).toContain('margin-left: -0%; opacity: 1; transition: none; width: 100%')
    })
  })

  describe('When receive hidePrevButton prop', () => {
    it('Should hide prev button', () => {
      const { container } = render(
        <SliderCarouselComponent
          numberOfCards={5}
          cards={cards}
          transitionTime={1000}
          hidePrevButton={true}
        />
      )
      expect(container.querySelector('.icon-arrow-left')).toBeNull()
    })
  })

  describe('When carousel is active', () => {
    it('Should assign first element with the last card and default margin left', () => {
      const { container } = render(
        <SliderCarouselComponent
          numberOfCards={5}
          cards={cards}
          transitionTime={1000}
        />
      )
      expect(
        container
          .querySelectorAll('.aux-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card2')
      expect(
        container
          .querySelectorAll('.aux-content .card-block')[4]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        container
          .querySelectorAll('.carousel-content .card-block')[1]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      expect(
        container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        container.querySelector('.carousel-content').getAttribute('style')
      ).toContain('margin-left: -20%;')
    })
  })

  describe('When receive transitionTime prop', () => {
    it('Add and remove transition style when press next or prev button', () => {
      const transitionTime = 500
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={5}
            cards={cards}
            transitionTime={transitionTime}
          />
        )
      })
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toContain('margin-left: -20%;')
      act(() => {
        fireEvent.click(component.container.querySelector('.icon-arrow-right'))
      })
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual(
        'margin-left: -40%; opacity: 1; transition: margin 400ms; width: 140%;'
      )
      act(() => {
        jest.advanceTimersByTime(transitionTime)
      })
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toContain(
        'margin-left: -40%; opacity: 1; transition: none; width: 140%;'
      )
    })
  })

  describe('When press next button', () => {
    const transitionTime = 1000
    const transitionSafeTime = 100

    it('Should await transition and change to the next card', () => {
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={5}
            cards={cards}
            transitionTime={transitionTime}
          />
        )
        fireEvent.click(component.container.querySelector('.icon-arrow-right'))
      })
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 0;')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card2')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[4]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container.querySelector('.carousel-content').className
      ).toContain('active-transition')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual(
        'margin-left: -40%; opacity: 1; transition: margin 900ms; width: 140%;'
      )
      act(() => {
        jest.advanceTimersByTime(transitionTime)
      })
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 1;')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual('margin-left: -40%; opacity: 1; transition: none; width: 140%;')
      expect(
        component.container.querySelector('.carousel-content').className
      ).not.toContain('active-transition')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      act(() => {
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual('margin-left: -20%; opacity: 0; transition: none; width: 140%;')
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 1;')
      act(() => {
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 0;')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card3')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[4]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      act(() => {
        jest.useRealTimers()
      })
    })

    it('Should disable button when transition is active', () => {
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={5}
            cards={cards}
            transitionTime={4000}
          />
        )
        fireEvent.click(component.container.querySelector('.icon-arrow-right'))
        jest.advanceTimersByTime(3000)
        fireEvent.click(component.container.querySelector('.icon-arrow-right'))
        jest.advanceTimersByTime(4000)
        expect(
          component.container
            .querySelectorAll('.carousel-content .card-block')[0]
            .querySelector('div').innerHTML
        ).toEqual('card1')
        jest.advanceTimersByTime(4000)
        expect(
          component.container
            .querySelectorAll('.carousel-content .card-block')[0]
            .querySelector('div').innerHTML
        ).toEqual('card1')
        act(() => {
          jest.useRealTimers()
        })
      })
    })
  })

  describe('When press prev button', () => {
    const transitionTime = 1000
    const transitionSafeTime = 100

    it('Should await transition and change to the prev card', () => {
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={5}
            cards={cards}
            transitionTime={transitionTime}
          />
        )
        fireEvent.click(component.container.querySelector('.icon-arrow-left'))
      })
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 0;')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[4]
          .querySelector('div').innerHTML
      ).toEqual('card4')
      expect(
        component.container.querySelector('.carousel-content').className
      ).toContain('active-transition')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual(
        'margin-left: -0%; opacity: 1; transition: margin 900ms; width: 140%;'
      )

      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card6')

      act(() => {
        jest.advanceTimersByTime(transitionTime)
      })

      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card6')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual('margin-left: -0%; opacity: 1; transition: none; width: 140%;')
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 1;')

      act(() => {
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card5')
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[6]
          .querySelector('div').innerHTML
      ).toEqual('card5')
      expect(
        component.container
          .querySelector('.carousel-content')
          .getAttribute('style')
      ).toEqual('margin-left: -20%; opacity: 0; transition: none; width: 140%;')
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 1;')
      act(() => {
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container.querySelector('.aux-content').getAttribute('style')
      ).toEqual('opacity: 0;')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[0]
          .querySelector('div').innerHTML
      ).toEqual('card5')
      expect(
        component.container
          .querySelectorAll('.aux-content .card-block')[4]
          .querySelector('div').innerHTML
      ).toEqual('card3')

      act(() => {
        jest.useRealTimers()
      })
    })
  })

  describe('When active infinity carousel', () => {
    it('Should add to the last block the firs card if it have no more cards and press next', () => {
      const transitionTime = 500
      const transitionSafeTime = transitionTime + 200
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={2}
            cards={[cards[0], cards[1], cards[2]]}
            transitionTime={transitionTime}
          />
        )
      })
      const rightArrow = component.container.querySelector('.icon-arrow-right')
      act(() => {
        fireEvent.click(rightArrow)
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[1]
          .querySelector('div').innerHTML
      ).toEqual('card2')
      act(() => {
        fireEvent.click(rightArrow)
        jest.advanceTimersByTime(transitionSafeTime)
        fireEvent.click(rightArrow)
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[1]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      act(() => {
        jest.useRealTimers()
      })
    })

    it('Should add to the first block the last card if it have no more previous cards and press prev', () => {
      const transitionTime = 500
      const transitionSafeTime = transitionTime + 200
      let component = null
      act(() => {
        jest.useFakeTimers()
        component = render(
          <SliderCarouselComponent
            numberOfCards={2}
            cards={[cards[0], cards[1], cards[2]]}
            transitionTime={transitionTime}
          />
        )
      })
      const leftArrow = component.container.querySelector('.icon-arrow-left')
      act(() => {
        fireEvent.click(leftArrow)
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[1]
          .querySelector('div').innerHTML
      ).toEqual('card3')
      act(() => {
        fireEvent.click(leftArrow)
        jest.advanceTimersByTime(transitionSafeTime)
        fireEvent.click(leftArrow)
        jest.advanceTimersByTime(transitionSafeTime)
      })
      expect(
        component.container
          .querySelectorAll('.carousel-content .card-block')[1]
          .querySelector('div').innerHTML
      ).toEqual('card1')
      act(() => {
        jest.useRealTimers()
      })
    })
  })
})

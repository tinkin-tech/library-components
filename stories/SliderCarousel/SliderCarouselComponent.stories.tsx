import * as React from 'react'

import {
  SliderCarouselComponent,
  ISliderCarouselComponent,
} from './SliderCarouselComponent'

export default {
  title: 'SliderCarousel',
  component: SliderCarouselComponent,
}

const Template = (args: ISliderCarouselComponent): JSX.Element => (
  <SliderCarouselComponent {...args} />
)

export const Default: { args: ISliderCarouselComponent } = Template.bind({})

const cards = [
  <div key={1}>card1</div>,
  <div key={2}>card2</div>,
  <div key={3}>card3</div>,
  <div key={4}>card4</div>,
  <div key={5}>card5</div>,
  <div key={6}>card6</div>,
]

Default.args = {
  cards,
  transitionTime: 500,
  numberOfCards: 4,
}

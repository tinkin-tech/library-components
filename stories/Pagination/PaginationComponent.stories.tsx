import * as React from 'react'
import PaginationComponent, {
  IPaginationComponent,
} from './PaginationComponent'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Pagination',
  component: PaginationComponent,
}

const Template = (arg: IPaginationComponent): JSX.Element => (
  <PaginationComponent {...arg} />
)

export const Default = Template.bind({})

Default.args = {
  totalPages: 20,
  currentPage: 10,
  pageNeighbours: 2,
  goToPage: action('goToPage'),
}

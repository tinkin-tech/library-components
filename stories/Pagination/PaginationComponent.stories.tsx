import * as React from 'react'
import PaginationComponent, {
  IPaginationComponent,
} from './PaginationComponent'

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
  currentPage: 5,
  pageNeighbours: 2,
  goToPage: (): void => null,
}

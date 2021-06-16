import * as React from 'react'

import { updateUrlParams } from '../../utils/urlUtils/urlUtils'

export interface IPaginationComponent {
  totalPages: number
  currentPage: number
  goToPage: (urlParam: string) => void
  pageNeighbours?: number
}

export const PaginationComponent: React.FC<IPaginationComponent> = (
  props: IPaginationComponent
) => {
  const { totalPages, pageNeighbours, currentPage } = props
  const defaultPageNeighbours = 2
  const sidePages = pageNeighbours || defaultPageNeighbours
  const goToPage = (page: React.ReactText): void => {
    const currentPage = Math.max(0, Math.min(+page, totalPages))
    props.goToPage(updateUrlParams('page', currentPage))
  }

  const LEFT_PAGE = 'LEFT'
  const RIGHT_PAGE = 'RIGHT'

  const range = (from: number, to: number, step = 1): string[] => {
    let i = from
    const range = []
    while (i <= to) {
      range.push(i)
      i += step
    }
    return range
  }

  const handleClick =
    (page: React.ReactText) =>
    (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      evt.preventDefault()
      goToPage(page)
    }

  const handleMoveLeft = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    evt.preventDefault()
    goToPage(currentPage - 1)
  }

  const handleMoveRight = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    evt.preventDefault()
    goToPage(currentPage + 1)
  }

  const fetchPageNumbers = (): React.ReactText[] => {
    const staticPagesNumber = 3
    const totalNumbers = sidePages + staticPagesNumber
    const staticBlocksNumber = 2
    const totalBlocks = totalNumbers + staticBlocksNumber
    if (totalPages > totalBlocks) {
      const startPage = Math.max(staticBlocksNumber, currentPage - sidePages)
      const endPage = Math.min(totalPages - 1, currentPage + sidePages)
      const pages = range(startPage, endPage)
      return [LEFT_PAGE, 1, ...pages, totalPages, RIGHT_PAGE]
    }
    return range(1, totalPages)
  }

  const pages = fetchPageNumbers()

  return (
    <nav className="pagination-component">
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={index} className="page-item">
                <a
                  className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                  href="#"
                  onClick={(e): void => currentPage > 1 && handleMoveLeft(e)}
                >
                  <i className="icon-arrow-left" />
                </a>
              </li>
            )
          }
          if (page === RIGHT_PAGE) {
            return (
              <li key={index} className="page-item">
                <a
                  className={`page-link ${
                    currentPage === totalPages ? 'disabled' : ''
                  }`}
                  href="#"
                  onClick={(e): void =>
                    currentPage < totalPages && handleMoveRight(e)
                  }
                >
                  <i className="icon-arrow-right" />
                </a>
              </li>
            )
          }
          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? ' selected' : ''}`}
            >
              <a className="page-link" href="#" onClick={handleClick(page)}>
                {page}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

import * as React from 'react'
import { updateUrlParams } from '../../utils/urlUtils/urlUtils'

export interface IPaginationComponent {
  totalPages: number
  currentPage: number
  goToPage: (urlParam: string) => void
  pageNeighbours?: number
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

const PaginationComponent: React.FC<IPaginationComponent> = (
  props: IPaginationComponent
) => {
  const { totalPages, pageNeighbours = 2, currentPage } = props
  const goToPage = (page: React.ReactText): void => {
    const currentPage = Math.max(0, Math.min(+page, totalPages))
    props.goToPage(updateUrlParams('page', currentPage))
  }

  const handleClick = (page: React.ReactText) => (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
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
    const totalNumbers = pageNeighbours + 3
    const totalBlocks = totalNumbers + 2
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)
      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }
      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  const pages = fetchPageNumbers()

  return (
    <>
      <nav aria-label="Countries Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" onClick={handleMoveLeft}>
                    <span aria-hidden="true">&laquo</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              )
            }
            if (page === RIGHT_PAGE) {
              return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" onClick={handleMoveRight}>
                    <span aria-hidden="true">&raquo</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              )
            }
            return (
              <li
                key={index}
                className={`page-item${
                  currentPage === page ? ' selected' : ''
                }`}
              >
                <a className="page-link" href="#" onClick={handleClick(page)}>
                  {page}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default PaginationComponent

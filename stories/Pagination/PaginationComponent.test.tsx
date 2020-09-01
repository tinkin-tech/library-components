import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PaginationComponent from './PaginationComponent'
import { setLocationSearchValue } from '../../utils/testUtils/testUtils'

describe('PaginationComponent test', () => {
  const mockedFunction = jest.fn()

  beforeEach(() => {
    mockedFunction.mockClear()
  })

  it('Should render component with all props', () => {
    const { container } = render(
      <PaginationComponent
        totalPages={10}
        currentPage={1}
        goToPage={mockedFunction}
      />
    )
    expect(container).toBeInTheDocument()
  })

  describe('Recive totalPages prop', () => {
    it(
      'Should show list of pages with length equal to totalPages when ' +
        'pass in props',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={5}
            goToPage={mockedFunction}
            currentPage={1}
          />
        )
        expect(container.getElementsByTagName('li')).toHaveLength(5)
      }
    )
  })

  describe('Recive buttonCount prop', () => {
    it(
      'Should show 5 pages with numbers and 4 with configs when not pass ' +
        'pageNeighbours prop',
      () => {
        const { container, getByText } = render(
          <PaginationComponent
            totalPages={20}
            goToPage={mockedFunction}
            currentPage={8}
          />
        )
        expect(container.getElementsByTagName('li')).toHaveLength(9)
        expect(getByText('7')).toBeInTheDocument()
        expect(getByText('6')).toBeInTheDocument()
        expect(getByText('8')).toBeInTheDocument()
        expect(getByText('9')).toBeInTheDocument()
        expect(getByText('10')).toBeInTheDocument()
      }
    )

    it('Should show pages equal to passed in pageNeighbours prop', () => {
      const { container, getByText, queryByText } = render(
        <PaginationComponent
          totalPages={30}
          goToPage={mockedFunction}
          pageNeighbours={1}
          currentPage={10}
        />
      )
      expect(container.getElementsByTagName('li')).toHaveLength(7)
      expect(queryByText('8')).not.toBeInTheDocument()
      expect(getByText('9')).toBeInTheDocument()
      expect(getByText('10')).toBeInTheDocument()
      expect(getByText('11')).toBeInTheDocument()
      expect(queryByText('12')).not.toBeInTheDocument()
    })
  })

  describe('Recive currentPage prop', () => {
    it(
      'Should show all pages if totalPages is smaller than pageNeighbours ' +
        'and add selected className when index of item is equal to currentPage',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={5}
            goToPage={mockedFunction}
            pageNeighbours={6}
            currentPage={2}
          />
        )
        expect(container.getElementsByTagName('li')).toHaveLength(5)
        expect(container.getElementsByTagName('li')[1].className).toContain(
          'selected'
        )
      }
    )

    it(
      'Should show currentPage button in center of list of pages when ' +
        'totalPages is bigger than buttonCount',
      () => {
        const { getByText, container } = render(
          <PaginationComponent
            totalPages={30}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={6}
          />
        )
        expect(getByText('6')).toBeInTheDocument()
        expect(container.getElementsByTagName('li')).toHaveLength(9)
        expect(container.getElementsByTagName('li')[4].innerHTML).toContain('6')
      }
    )
  })

  describe('Arrow prev', () => {
    it(
      'Should show arrow prev when number of items before currentPage are ' +
        'bigger to pageNeighbours',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={20}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={10}
          />
        )
        expect(container.getElementsByTagName('li')[1].innerHTML).toContain(
          '&amp;laquo'
        )
      }
    )

    it(
      'Should show number of item in second position when number of items ' +
        'before currentPage are smaller than pageNeighbours',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={20}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={4}
          />
        )
        expect(container.getElementsByTagName('li')[1].innerHTML).toContain('2')
      }
    )
  })

  describe('Next arrow', () => {
    it(
      'Should show next arrow when number of items after currentPage are ' +
        'bigger than pageNeighbours',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={10}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={4}
          />
        )
        expect(container.getElementsByTagName('li')[6].innerHTML).toContain(
          '&amp;raquo'
        )
      }
    )

    it(
      'Should show number of item in second last position when number of ' +
        'items after currentPage are smaller than pageNeighbours',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={20}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={17}
          />
        )
        expect(container.getElementsByTagName('li')[6].innerHTML).toContain(
          '19'
        )
      }
    )
  })

  it('Should 1 allways should be the first item of a list', () => {
    const { container } = render(
      <PaginationComponent
        totalPages={10}
        goToPage={mockedFunction}
        pageNeighbours={1}
        currentPage={8}
      />
    )
    expect(container.getElementsByTagName('li')[0].innerHTML).toContain('1')
  })

  it('Should number of totalPages allways should be the last item', () => {
    const { container } = render(
      <PaginationComponent
        totalPages={10}
        goToPage={mockedFunction}
        pageNeighbours={1}
        currentPage={1}
      />
    )
    expect(container.getElementsByTagName('li')).toHaveLength(6)
    expect(container.getElementsByTagName('li')[5].innerHTML).toContain(10)
  })

  describe('Recive goToPage', () => {
    const oldWindowLocation = window.location

    afterAll(() => {
      window.location = oldWindowLocation
    })

    it(
      'Should call goToPage fn with current queryParam changed page query ' +
        'with selected page when click it number of page',
      () => {
        setLocationSearchValue('?page=3&filter=demo')
        const { getByText } = render(
          <PaginationComponent
            totalPages={11}
            goToPage={mockedFunction}
            pageNeighbours={3}
            currentPage={3}
          />
        )
        fireEvent.click(getByText('6'))
        expect(mockedFunction).toHaveBeenCalledWith('?filter=demo&page=6')
      }
    )

    it(
      'Should call goToPage fn and create page queryParam changed ' +
        'with selected page when click it number of page',
      () => {
        setLocationSearchValue('')
        const { getByText } = render(
          <PaginationComponent
            totalPages={11}
            goToPage={mockedFunction}
            pageNeighbours={3}
            currentPage={3}
          />
        )
        fireEvent.click(getByText('4'))
        expect(mockedFunction).toHaveBeenCalledWith('?page=4')
      }
    )

    it(
      'Should call goToPage with currentPage - 1, when click on prev ' +
        'arrow',
      () => {
        setLocationSearchValue('')
        const { getByText } = render(
          <PaginationComponent
            currentPage={6}
            goToPage={mockedFunction}
            totalPages={11}
            pageNeighbours={1}
          />
        )
        fireEvent.click(getByText('&laquo'))
        expect(mockedFunction).toHaveBeenCalledWith('?page=5')
      }
    )

    it(
      'Should call goToPage with currentPage + 1, when click on next ' +
        'arrow',
      () => {
        setLocationSearchValue('')
        const { getByText } = render(
          <PaginationComponent
            currentPage={6}
            goToPage={mockedFunction}
            totalPages={11}
            pageNeighbours={1}
          />
        )
        fireEvent.click(getByText('&raquo'))
        expect(mockedFunction).toHaveBeenCalledWith('?page=7')
      }
    )
  })
})

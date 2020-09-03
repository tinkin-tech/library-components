import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PaginationComponent from './PaginationComponent'
import { setLocationSearchValue } from '../../utils/testUtils/testUtils'

describe('Render component <PaginationComponent />', () => {
  const mockedFunction = jest.fn()

  beforeEach(() => {
    mockedFunction.mockClear()
  })

  describe('When recive totalPages prop', () => {
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

  describe('When recive buttonCount prop', () => {
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
        for (let i = 6; i <= 10; i++) {
          expect(getByText(i.toString())).toBeInTheDocument()
        }
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

  describe('When recive currentPage prop', () => {
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
  })

  describe('When show arrow prev', () => {
    it(
      'Should add arrow prev class disable and not execute action of on ' +
        'click when number currentPage are equal to 1',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={20}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={1}
          />
        )
        expect(container.getElementsByTagName('a')[0].className).toBe(
          'page-link disabled'
        )
        fireEvent.click(container.getElementsByTagName('a')[0])
        expect(mockedFunction).toHaveBeenCalledTimes(0)
      }
    )

    it(
      'Should show number of item in third position when number of items ' +
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
        expect(container.getElementsByTagName('li')[2].innerHTML).toContain('2')
      }
    )
  })

  describe('When show next arrow', () => {
    it(
      'Should show next arrow when number of items after currentPage are ' +
        'bigger than pageNeighbours',
      () => {
        const { container } = render(
          <PaginationComponent
            totalPages={10}
            goToPage={mockedFunction}
            pageNeighbours={2}
            currentPage={10}
          />
        )
        expect(container.getElementsByTagName('a')[5].className).toBe(
          'page-link disabled'
        )
        fireEvent.click(container.getElementsByTagName('a')[5])
        expect(mockedFunction).toHaveBeenCalledTimes(0)
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

  it('Should 1 allways should be the second item of a list', () => {
    const { container } = render(
      <PaginationComponent
        totalPages={10}
        goToPage={mockedFunction}
        pageNeighbours={1}
        currentPage={8}
      />
    )
    expect(container.getElementsByTagName('li')[1].innerHTML).toContain('1')
  })

  it('Should totalPages allways should be the second last item', () => {
    const { container } = render(
      <PaginationComponent
        totalPages={10}
        goToPage={mockedFunction}
        pageNeighbours={1}
        currentPage={3}
      />
    )
    expect(container.getElementsByTagName('li')).toHaveLength(7)
    expect(container.getElementsByTagName('li')[5].innerHTML).toContain(10)
  })

  describe('When recive goToPage', () => {
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
        const { container } = render(
          <PaginationComponent
            currentPage={6}
            goToPage={mockedFunction}
            totalPages={11}
            pageNeighbours={1}
          />
        )
        fireEvent.click(container.getElementsByTagName('a')[0])
        expect(mockedFunction).toHaveBeenCalledWith('?page=5')
      }
    )

    it(
      'Should call goToPage with currentPage + 1, when click on next ' +
        'arrow',
      () => {
        setLocationSearchValue('')
        const { container } = render(
          <PaginationComponent
            currentPage={6}
            goToPage={mockedFunction}
            totalPages={11}
            pageNeighbours={1}
          />
        )
        fireEvent.click(container.getElementsByTagName('a')[6])
        expect(mockedFunction).toHaveBeenCalledWith('?page=7')
      }
    )
  })
})

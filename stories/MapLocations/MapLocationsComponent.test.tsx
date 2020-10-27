import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import MapLocationsComponent from './MapLocationsComponent'

describe('Render component <MapLocationsComponent/>', () => {
  const mapLocations = [
    {
      id: 'city1',
      name: 'B City 1',
      locations: [
        {
          id: 'location1',
          name: 'B Location 1',
          description: 'Description location 1',
          lat: 0.001,
          long: 0.0009,
        },
        {
          id: 'location2',
          name: 'A Location 2',
          description: 'Description location 2',
          lat: 0.0005,
          long: 0.00008,
        },
      ],
    },
    {
      id: 'city2',
      name: 'C City 2',
      locations: [
        {
          id: 'location3',
          name: 'Location 3',
          description: 'Description location 3',
          lat: 0.0015,
          long: 0.00095,
        },
        {
          id: 'location4',
          name: 'Location 4',
          description: 'Description location 4',
          lat: 0.00056,
          long: 0.000087,
        },
      ],
    },
    {
      id: 'city3',
      name: 'A City 3',
      locations: [
        {
          id: 'location5',
          name: 'Z Location 5',
          description: 'Description location 5',
          lat: 0.00098,
          long: 0.00098,
        },
        {
          id: 'location6',
          name: 'A Location 6',
          description: 'Description location 6',
          lat: 0.00058,
          long: 0.000088,
        },
        {
          id: 'location7',
          name: 'C Location 7',
          description: 'Description location 7',
          lat: 0.00058,
          long: 0.000088,
        },
      ],
    },
  ]

  describe('When receives a list of cities with locations', () => {
    it('Should show a select component with a list of cities', () => {
      const { getByText } = render(
        <MapLocationsComponent mapLocations={[...mapLocations]} />
      )
      fireEvent.click(getByText('Seleccione una opción'))
      mapLocations.forEach((city) => {
        expect(getByText(city.name)).toBeInTheDocument()
      })
    })

    it.each(mapLocations)(
      'Should show all locations data for %p',
      ({ name, locations }) => {
        const { getByText } = render(
          <MapLocationsComponent mapLocations={[...mapLocations]} />
        )
        expect(getByText(`Locaciones en: ${name}`)).toBeInTheDocument()
        locations.forEach((location) => {
          expect(getByText(location.name)).toBeInTheDocument()
          expect(getByText(location.description)).toBeInTheDocument()
        })
      }
    )

    it('Should hide description container if location description does not exist', () => {
      const { getByText } = render(
        <MapLocationsComponent
          mapLocations={[
            {
              id: 'cityND',
              name: 'City no description',
              locations: [
                {
                  id: 'locationNoDescription',
                  name: 'Location no description',
                  lat: 0.001,
                  long: 0.0087,
                },
              ],
            },
          ]}
        />
      )
      expect(
        getByText('Location no description').parentElement.querySelector(
          '.location-description'
        )
      ).not.toBeInTheDocument()
    })

    it('Should hide city if no have locations', () => {
      const { queryByText } = render(
        <MapLocationsComponent
          mapLocations={[
            {
              id: 'cityND',
              name: 'City no description',
              locations: [],
            },
          ]}
        />
      )
      expect(
        queryByText('Locaciones en: City no description')
      ).not.toBeInTheDocument()
      fireEvent.click(queryByText('Seleccione una opción'))
      expect(queryByText('City no description')).not.toBeInTheDocument()
    })
  })

  describe('When receives alphabeticalOrder prop', () => {
    it('Should show list of cities and locations ordered alphabetically', () => {
      const { getByText, container } = render(
        <MapLocationsComponent
          mapLocations={[...mapLocations]}
          alphabeticalOrder={true}
        />
      )
      fireEvent.click(getByText('Seleccione una opción'))
      const optionList = container.querySelectorAll('.locations-nav li')
      expect(optionList[0].textContent).toEqual('A City 3')
      expect(optionList[1].textContent).toEqual('B City 1')
      expect(optionList[2].textContent).toEqual('C City 2')
      const locationsBlockList = container
        .querySelectorAll('.locations-block')[0]
        .querySelectorAll('.location-title')
      expect(locationsBlockList[0].textContent).toEqual('A Location 6')
      expect(locationsBlockList[1].textContent).toEqual('C Location 7')
      expect(locationsBlockList[2].textContent).toEqual('Z Location 5')
    })
  })

  describe('When select a city', () => {
    it('Should show only the locations of that city without the city name', () => {
      const { queryByText, container } = render(
        <MapLocationsComponent mapLocations={[...mapLocations]} />
      )
      fireEvent.click(queryByText('Seleccione una opción'))
      fireEvent.click(queryByText('B City 1'))
      const locationsBlocks = container.querySelectorAll('.locations-block')
      expect(locationsBlocks).toHaveLength(1)
      const locationList = locationsBlocks[0].querySelectorAll(
        '.location-title'
      )
      expect(locationList).toHaveLength(2)
      mapLocations[0].locations.forEach((location) => {
        expect(queryByText(location.name)).toBeInTheDocument()
      })
      expect(queryByText('Locaciones en: B City 1')).not.toBeInTheDocument()
    })
  })
})

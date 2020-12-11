import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import googleApi from '@react-google-maps/api'

import MapLocationsComponent from './MapLocationsComponent'
import { IAbstractProp } from '../../utils/interface/SharedInterface'
import {
  googleMock,
  mockGoogleMap,
  mockInfoWindow,
  mockMarker,
  mockMarkerCluster,
} from './GoogleMapsMock'

const mockLatLng = (): IAbstractProp => ({
  lat: jest.fn().mockImplementation(() => 0.00834),
  lng: jest.fn().mockImplementation(() => 0.00534),
})

global.google = googleMock(mockLatLng)

describe('Render component <MapLocationsComponent/>', () => {
  const mockFunction = jest.fn()
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
          lng: 0.0009,
        },
        {
          id: 'location2',
          name: 'A Location 2',
          description: 'Description location 2',
          lat: 0.0005,
          lng: 0.00008,
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
          lng: 0.00095,
        },
        {
          id: 'location4',
          name: 'Location 4',
          description: 'Description location 4',
          lat: 0.00056,
          lng: 0.000087,
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
          lng: 0.00098,
        },
        {
          id: 'location6',
          name: 'A Location 6',
          description: 'Description location 6',
          lat: 0.00058,
          lng: 0.000088,
        },
        {
          id: 'location7',
          name: 'C Location 7',
          description: 'Description location 7',
          lat: 0.00058,
          lng: 0.000078,
        },
      ],
    },
  ]

  const mapProps = {
    mapLocations: [...mapLocations],
    mapHeight: '400px',
    mapWidth: '400px',
    googleMapsApiKey: '',
  }

  describe('When receives a list of cities with locations', () => {
    it('Should show a select component with a list of cities', () => {
      const { getByText } = render(<MapLocationsComponent {...mapProps} />)
      fireEvent.click(getByText('Seleccione una opción'))
      mapLocations.forEach((city) => {
        expect(getByText(city.name)).toBeInTheDocument()
      })
    })

    it.each(mapLocations)(
      'Should show all locations data for %p',
      ({ name, locations }) => {
        const { getByText } = render(<MapLocationsComponent {...mapProps} />)
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
          {...mapProps}
          mapLocations={[
            {
              id: 'cityND',
              name: 'City no description',
              locations: [
                {
                  id: 'locationNoDescription',
                  name: 'Location no description',
                  lat: 0.001,
                  lng: 0.0087,
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
          {...mapProps}
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

  describe('When receive placeholder', () => {
    it('Should show custom placeholder', () => {
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} placeholder="Select a city" />
      )
      expect(queryByText('Seleccione una opción')).not.toBeInTheDocument()
      expect(queryByText('Select a city')).toBeInTheDocument()
    })
  })

  describe('When receive title', () => {
    it('Should show title', () => {
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} title="Map Title" />
      )
      expect(queryByText('Map Title')).toBeInTheDocument()
    })
  })

  describe('When receive label', () => {
    it('Should show label above the select', () => {
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} label="Cities" />
      )
      expect(queryByText('Cities')).toBeInTheDocument()
    })
  })

  describe('When receives alphabeticalOrder prop', () => {
    it('Should show list of cities and locations ordered alphabetically', () => {
      const { getByText, container } = render(
        <MapLocationsComponent {...mapProps} alphabeticalOrder={true} />
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
        <MapLocationsComponent {...mapProps} />
      )
      fireEvent.click(queryByText('Seleccione una opción'))
      fireEvent.click(queryByText('B City 1'))
      expect(queryByText('B City 1')).toBeInTheDocument()
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

  describe('When select a location', () => {
    it('Should not call onSelect when no prop exists', () => {
      const { queryByText } = render(<MapLocationsComponent {...mapProps} />)
      fireEvent.click(queryByText('Location 3'))
      expect(mockFunction).not.toHaveBeenCalled()
    })

    it('Should add selector flag at the location when click this', () => {
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} onSelectLocation={mockFunction} />
      )
      fireEvent.click(queryByText('Location 3'))
      expect(mockFunction).toHaveBeenCalledWith({
        description: 'Description location 3',
        id: 'location3',
        lat: 0.0015,
        lng: 0.00095,
        name: 'Location 3',
      })
      expect(queryByText('Location 3').parentElement.className).toContain(
        'selected'
      )
      expect(queryByText('B Location 1').parentElement.className).not.toContain(
        'selected'
      )
      fireEvent.click(queryByText('B Location 1'))
      expect(queryByText('Location 3').parentElement.className).not.toContain(
        'selected'
      )
      expect(queryByText('B Location 1').parentElement.className).toContain(
        'selected'
      )
    })

    it('Should remove all selector flag when selecting a city', () => {
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} onSelectLocation={mockFunction} />
      )
      fireEvent.click(queryByText('Location 3'))
      expect(queryByText('Location 3').parentElement.className).toContain(
        'selected'
      )
      fireEvent.click(queryByText('Seleccione una opción'))
      fireEvent.click(queryByText('C City 2'))
      expect(queryByText('Location 3').parentElement.className).not.toContain(
        'selected'
      )
      expect(mockFunction).toHaveBeenCalledWith(null)
    })
  })

  describe('When receive defaultLocationSelected', () => {
    it('Should select city and location when receive prop and the values exist', () => {
      const { queryByText } = render(
        <MapLocationsComponent
          {...mapProps}
          placeholder="Select a city"
          defaultLocationSelected="location4"
        />
      )
      expect(queryByText('C City 2')).toBeInTheDocument()
      expect(queryByText('Location 4').parentElement.className).toContain(
        'selected'
      )
    })
  })

  describe('When call google maps api', () => {
    const googleApiMock: IAbstractProp = googleApi as jest.MockOptions
    const mockReact: IAbstractProp = React as jest.MockOptions

    beforeAll(() => {
      mockReact.useRef = jest.fn()
      mockReact.useRef.mockImplementation(() => ({
        current: {
          offsetWidth: 400,
          offsetHeight: 300,
        },
      }))
      googleApiMock.useLoadScript = jest.fn()
      googleApiMock.InfoWindow = mockInfoWindow
      googleApiMock.Marker = mockMarker
      googleApiMock.MarkerClusterer = mockMarkerCluster(0.00058)
      googleApiMock.GoogleMap = mockGoogleMap
      googleApiMock.useLoadScript.mockImplementation(() => ({ isLoaded: true }))
    })

    it('Should render a google map', () => {
      const { queryByText, queryAllByText } = render(
        <MapLocationsComponent {...mapProps} onSelectLocation={mockFunction} />
      )
      expect(queryByText('Google Map is Load')).toBeInTheDocument()
      expect(queryByText('zoom: 21')).toBeInTheDocument()
      fireEvent.click(queryByText('Location 3'))
      expect(queryByText('zoom: 16')).toBeInTheDocument()
      fireEvent.click(queryByText('Cluster Click'))
      expect(queryByText('Cluster item: A City 3')).toBeInTheDocument()
      expect(queryAllByText('Marker - Item')).toHaveLength(7)
    })

    it('Should select a city when clicking on the mark', () => {
      const { queryAllByText, queryByText } = render(
        <MapLocationsComponent {...mapProps} onSelectLocation={mockFunction} />
      )
      fireEvent.click(queryAllByText('Marker - Item')[2])
      expect(mockFunction).toHaveBeenCalledWith({
        id: 'location3',
        name: 'Location 3',
        description: 'Description location 3',
        lat: 0.0015,
        lng: 0.00095,
      })
      expect(queryByText('Move Mark Location')).toBeInTheDocument()
      expect(queryByText('Active Info Mark')).toBeInTheDocument()
      fireEvent.click(queryByText('close button'))
      expect(queryByText('Active Info Mark')).not.toBeInTheDocument()
    })

    it('Should show custom info component if it has customInfoContent', () => {
      const { queryAllByText, queryByText } = render(
        <MapLocationsComponent
          {...mapProps}
          customInfoContent={(): IAbstractProp => <div>Custom Content</div>}
        />
      )
      fireEvent.click(queryAllByText('Marker - Item')[2])
      expect(queryByText('Custom Content')).toBeInTheDocument()
    })

    it('Should select a city when locations are not grouped', () => {
      googleApiMock.MarkerClusterer = jest.fn().mockImplementation((props) => (
        <div>
          <a
            onClick={(): IAbstractProp =>
              props.onClick({
                getMarkers: () => [
                  { position: { lat: (): IAbstractProp => 0.00058 } },
                  { position: { lat: (): IAbstractProp => 0.00068 } },
                  { position: { lat: (): IAbstractProp => 0.00078 } },
                ],
              })
            }
          >
            Cluster Click
          </a>
        </div>
      ))
      const { queryByText } = render(
        <MapLocationsComponent {...mapProps} onSelectLocation={mockFunction} />
      )
      fireEvent.click(queryByText('Cluster Click'))
      expect(mockFunction).toHaveBeenCalledWith(null)
    })

    it('Should set zoom in relation to height prop', () => {
      mockReact.useRef.mockImplementation(() => ({
        current: {
          offsetWidth: 400,
          offsetHeight: null,
        },
      }))
      const { queryByText } = render(
        <MapLocationsComponent
          {...mapProps}
          onSelectLocation={mockFunction}
          mapHeight="800"
        />
      )
      expect(queryByText('zoom: 21')).toBeInTheDocument()
    })
  })
})

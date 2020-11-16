import * as React from 'react'

import MapLocationsComponent, {
  IMapLocationComponentProps,
} from './MapLocationsComponent'

const mapLocations = [
  {
    id: 'city1',
    name: 'B City 1',
    locations: [
      {
        id: 'location1',
        name: 'B Location 1',
        description: 'Description location 1',
        lat: -0.105415,
        lng: -78.48795,
      },
      {
        id: 'location2',
        name: 'A Location 2',
        description: 'Description location 2',
        lat: -0.101078,
        lng: -78.422201,
      },
      {
        id: 'location2-1',
        name: 'A Location 2-1',
        description: 'Description location 2 - 1',
        lat: -0.172812,
        lng: -78.476501,
      },
      {
        id: 'location2-2',
        name: 'A Location 2-2',
        description: 'Description location 2 - 2',
        lat: -0.176542,
        lng: -78.485175,
      },
      {
        id: 'location2-3',
        name: 'A Location 2-3',
        description: 'Description location 2 - 3',
        lat: -0.286181,
        lng: -78.54251,
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
        lat: -2.171725,
        lng: -79.903858,
      },
      {
        id: 'location4',
        name: 'Location 4',
        description: 'Description location 4',
        lat: -2.189054,
        lng: -79.879772,
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
        lat: -4.004662,
        lng: -79.204793,
      },
      {
        id: 'location6',
        name: 'A Location 6',
        description: 'Description location 6',
        lat: -3.990706,
        lng: -79.198317,
      },
      {
        id: 'location7',
        name: 'C Location 7',
        description: 'Description location 7',
        lat: -3.99091,
        lng: -79.211005,
      },
    ],
  },
]

export default {
  title: 'Map Locations',
  component: MapLocationsComponent,
}

const Template = (arg: IMapLocationComponentProps): JSX.Element => (
  <MapLocationsComponent {...arg} />
)

export const Default: { args: IMapLocationComponentProps } = Template.bind({})

Default.args = {
  googleMapsApiKey: '',
  mapLocations,
  mapWidth: '500px',
  mapHeight: '600px',
}

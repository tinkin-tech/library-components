import * as React from 'react'

import { SelectComponent } from '..'
import es_EC from './languages/es_EC'

interface ILocation {
  id: string
  name: string
  lat: number
  long: number
  description?: string
}

interface ICity {
  id: string | number
  name: string
  locations: Array<ILocation>
}
export interface IMapLocationComponentProps {
  mapLocations: Array<ICity>
  alphabeticalOrder?: boolean
}
const MapLocationsComponent = (
  props: IMapLocationComponentProps
): JSX.Element => {
  const { mapLocations, alphabeticalOrder } = props
  const [activeCity, ChangeActiveCity] = React.useState(null)
  const selectCity = (id: string): void => {
    ChangeActiveCity(id)
  }
  const locations: Array<ICity> = alphabeticalOrder
    ? mapLocations
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((city) => ({
          id: city.id,
          name: city.name,
          locations: city.locations.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        }))
    : mapLocations
  const genLocations = (
    cityLocations: ICity,
    key: number | string,
    hideTitle?: boolean
  ): JSX.Element => (
    <div key={key} className="locations-block">
      {!hideTitle && (
        <h3>{`${es_EC.LOCATION_CITY_PREFIX} ${cityLocations.name}`}</h3>
      )}
      {cityLocations.locations.map((location, locationKey) => (
        <div key={locationKey} className="location-item">
          <h4 className="location-title">{location.name}</h4>
          {!!location.description && (
            <p className="location-description">{location.description}</p>
          )}
        </div>
      ))}
    </div>
  )
  return (
    <div className="map-locations-component">
      <div className="locations-nav">
        <SelectComponent
          options={locations
            .filter((city) => city.locations.length)
            .map((city) => ({
              id: city.id,
              label: city.name,
            }))}
          valueId="selectedCity"
          onChangeValue={selectCity}
          value={null}
          placeholder={es_EC.PLACEHOLDER}
        />
        <div className="location-list">
          {activeCity
            ? genLocations(
                locations.find((city) => city.id === activeCity),
                activeCity,
                true
              )
            : locations.map(
                (city, cityKey) =>
                  !!city.locations.length && genLocations(city, cityKey)
              )}
        </div>
      </div>
      <div className="locations-map" />
    </div>
  )
}

export default MapLocationsComponent

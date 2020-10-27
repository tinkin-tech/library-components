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
  placeholder?: string
  label?: string
  alphabeticalOrder?: boolean
  defaultLocationSelected?: string | number
  onSelectLocation?: (locationId: string | number) => void
}
const MapLocationsComponent = (
  props: IMapLocationComponentProps
): JSX.Element => {
  const {
    mapLocations,
    alphabeticalOrder,
    placeholder,
    label,
    onSelectLocation,
    defaultLocationSelected,
  } = props
  const [activeCity, ChangeActiveCity] = React.useState(null)
  const [activeLocation, ChangeActiveLocation] = React.useState(null)
  const defaultSelectedCity = mapLocations.find((city) =>
    city.locations.find((location) => location.id === defaultLocationSelected)
  )
  const selectCity = (id: string): void => {
    ChangeActiveLocation(null)
    ChangeActiveCity(id)
    if (onSelectLocation) {
      onSelectLocation(null)
    }
  }
  const selectLocation = (id: string): void => {
    ChangeActiveLocation(id)
    if (onSelectLocation) {
      onSelectLocation(id)
    }
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
        <div
          key={locationKey}
          className={`location-item ${
            ((!activeLocation && defaultLocationSelected === location.id) ||
              activeLocation === location.id) &&
            'selected'
          }`}
          onClick={() => selectLocation(location.id)}
        >
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
          label={label}
          options={locations
            .filter((city) => city.locations.length)
            .map((city) => ({
              id: city.id,
              label: city.name,
            }))}
          valueId="selectedCity"
          onChangeValue={selectCity}
          placeholder={placeholder || es_EC.PLACEHOLDER}
          value={
            defaultSelectedCity && !activeCity
              ? defaultSelectedCity.id
              : activeCity
          }
        />
        <div className="location-list">
          {activeCity || defaultSelectedCity
            ? genLocations(
                !activeCity && defaultSelectedCity
                  ? defaultSelectedCity
                  : locations.find((city) => city.id === activeCity),
                'activeLocation',
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

import * as React from 'react'
import { ClustererProps } from '@react-google-maps/api/dist/components/addons/MarkerClusterer'
import {
  GoogleMap,
  MarkerClusterer,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'

import { SelectComponent } from '..'
import es_EC from './languages/es_EC'
import { IAbstractObject } from '../../utils/interface/SharedInterface'

export interface ILocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
}

export interface ICity {
  id: string | number
  name: string
  locations: Array<ILocation>
}

interface IMapStylers {
  [name: string]: string | number
}

export interface IMapStyle {
  featureType?: string
  elementType?: string
  stylers: Array<IMapStylers>
}

export interface IMapLocationComponentProps {
  googleMapsApiKey: string
  mapHeight: string
  mapWidth: string
  mapLocations: Array<ICity>
  placeholder?: string
  label?: string
  alphabeticalOrder?: boolean
  defaultLocationSelected?: string | number
  onSelectLocation?: (location: ILocation) => void
  cityNameClass?: string
  selectorExtraClass?: string
  optionExtraClass?: string
  optionTitleExtraClass?: string
  optionDescriptionExtraClass?: string
  title?: string
  titleExtraClass?: string
  markerClusterIcon?: string
  markerClusterIconExtension?: string
  markerIcon?: string
  markerIconActive?: string
  clusterSuffix?: string
  viewAllLabel?: string
  customInfoContent?: (ILocation) => JSX.Element
  cityPrefix?: string
  mapHeader?: JSX.Element
  customLayout?: Array<IMapStyle>
}
const MapLocationsComponent = (
  props: IMapLocationComponentProps
): JSX.Element => {
  const {
    googleMapsApiKey,
    mapLocations,
    alphabeticalOrder,
    placeholder,
    label,
    onSelectLocation,
    defaultLocationSelected,
    cityNameClass,
    optionTitleExtraClass,
    optionExtraClass,
    optionDescriptionExtraClass,
    selectorExtraClass,
    titleExtraClass,
    title,
    mapHeight,
    mapWidth,
    customInfoContent,
    markerClusterIcon,
    markerIcon,
    markerIconActive,
    markerClusterIconExtension,
    clusterSuffix,
    viewAllLabel,
    cityPrefix,
    mapHeader,
    customLayout,
  } = props
  const mapContainer = React.useRef(null)
  const [isOpenDetail, ChangeIsOpenDetail] = React.useState(false)
  const [activeCity, ChangeActiveCity] = React.useState(null)
  const [activeLocation, ChangeActiveLocation] = React.useState<ILocation>(null)
  const { isLoaded } = useLoadScript({
    id: 'script-loader',
    version: 'weekly',
    googleMapsApiKey,
  })
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
  const selectLocation = (location: ILocation): void => {
    ChangeActiveLocation(location)
    ChangeIsOpenDetail(true)
    if (onSelectLocation) {
      onSelectLocation(location)
    }
  }
  const genLocations = (
    cityLocations: ICity,
    key: number | string,
    hideTitle?: boolean
  ): JSX.Element => (
    <div key={key} className="locations-block">
      {!hideTitle && (
        <h3 className={cityNameClass}>{`${
          cityPrefix || cityPrefix === ''
            ? cityPrefix
            : es_EC.LOCATION_CITY_PREFIX
        } ${cityLocations.name}`}</h3>
      )}
      {cityLocations.locations.map((location, locationKey) => (
        <div
          key={locationKey}
          className={`${optionExtraClass} location-item ${
            ((!activeLocation && defaultLocationSelected === location.id) ||
              activeLocation?.id === location.id) &&
            'selected'
          }`}
          onClick={(): void => selectLocation(location)}
        >
          <h4 className={`${optionTitleExtraClass} location-title`}>
            {location.name}
          </h4>
          {!!location.description && (
            <p
              className={`location-description ${optionDescriptionExtraClass}`}
            >
              {location.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )

  const containerStyle = {
    width: '100%',
    height: mapHeight,
  }

  const genMapLocations = (): Array<ILocation> => {
    if (activeCity || defaultSelectedCity) {
      return !activeCity && defaultSelectedCity
        ? defaultSelectedCity.locations
        : locations.find((city) => city.id === activeCity).locations
    }
    return locations.reduce(
      (accumulator, city) => [...accumulator, ...city.locations],
      []
    )
  }

  const locationsPoints = genMapLocations()

  const optionsLocations: ClustererProps = {
    children: null,
    imageExtension: markerClusterIconExtension || 'png',
    imagePath:
      markerClusterIcon ||
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocationsBounds = (): any => {
    const googleApi = google
    const bound = new googleApi.maps.LatLngBounds()
    for (let i = 0; i < locationsPoints.length; i++) {
      bound.extend(
        new googleApi.maps.LatLng(
          locationsPoints[i].lat,
          locationsPoints[i].lng
        )
      )
    }
    return bound
  }

  const calculateZoom = (bounds, mapDim): number => {
    const totalDegrees = 360
    const detailZoom = 16
    if (activeLocation && isOpenDetail) {
      return detailZoom
    }
    const WORLD_DIM = { height: 256, width: 256 }
    const ZOOM_MAX = 21
    const HALF_NUMBER = 2
    const latRad = (lat): number => {
      const sin = Math.sin((lat * Math.PI) / (totalDegrees / HALF_NUMBER))
      const radX2 = Math.log((1 + sin) / (1 - sin)) / HALF_NUMBER
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / HALF_NUMBER
    }

    const zoom = (mapPx, worldPx, fraction): number =>
      Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2)

    const ne = bounds.getNorthEast()
    const sw = bounds.getSouthWest()

    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI

    const lngDiff = ne.lng() - sw.lng()
    const lngFraction =
      (lngDiff < 0 ? lngDiff + totalDegrees : lngDiff) / totalDegrees

    const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction)
    const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction)
    return Math.min(latZoom, lngZoom, ZOOM_MAX)
  }

  const renderMap = (): JSX.Element => {
    const mapBounds = getLocationsBounds()
    const centerObject =
      activeLocation && isOpenDetail
        ? {
            lat: (): number => activeLocation.lat,
            lng: (): number => activeLocation.lng,
          }
        : mapBounds.getCenter()
    const centerPoint = {
      lat: centerObject.lat(),
      lng: centerObject.lng(),
    }
    const mapZoom = calculateZoom(mapBounds, {
      width: mapContainer.current.offsetWidth,
      height: mapContainer.current.offsetHeight || mapHeight,
    })

    const findCityByLat = (lat: number): ICity =>
      mapLocations.find((city) =>
        city.locations.find((location) => location.lat === lat)
      )
    const mapOptions: IAbstractObject = {
      streetViewControl: false,
    }
    if (customLayout) {
      mapOptions.styles = customLayout
    }
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerPoint}
        zoom={mapZoom}
        clickableIcons={false}
        options={{ ...mapOptions }}
      >
        <>
          <MarkerClusterer
            options={optionsLocations}
            calculator={(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              markers: any,
              num
            ): { text: string; index: number; title: string } => {
              const clusterCity = findCityByLat(markers[0].position.lat())
              return {
                text: `${markers.length} ${clusterSuffix || ''}`,
                index: num,
                title: clusterCity.name,
              }
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(cluster: any): void => {
              const markers = cluster.getMarkers()
              const clusterCity = findCityByLat(markers[0].position.lat())
              if (
                markers.length ===
                mapLocations.find((lct) => lct.id === clusterCity.id).locations
                  .length
              ) {
                selectCity(clusterCity.id as string)
              }
            }}
          >
            {(clusterer): Array<JSX.Element> =>
              locationsPoints.map((locationPoint) => (
                <Marker
                  icon={
                    activeLocation.id === locationPoint.id && markerIconActive
                      ? markerIconActive
                      : markerIcon
                  }
                  key={`${locationPoint.lat}${locationPoint.lng}`}
                  position={locationPoint}
                  clusterer={clusterer}
                  onClick={(): void => {
                    selectLocation(locationPoint)
                  }}
                />
              ))
            }
          </MarkerClusterer>
          {!!(activeLocation && isOpenDetail) && (
            <InfoWindow
              options={{
                pixelOffset: {
                  height: -50,
                  width: 0,
                  equals: (): boolean => true,
                },
              }}
              onCloseClick={(): void => ChangeIsOpenDetail(false)}
              position={{ lat: activeLocation.lat, lng: activeLocation.lng }}
            >
              {customInfoContent ? (
                customInfoContent(activeLocation)
              ) : (
                <div>{activeLocation.name}</div>
              )}
            </InfoWindow>
          )}
        </>
      </GoogleMap>
    )
  }

  const selectOptions = locations
    .filter((city) => city.locations.length)
    .map((city) => ({
      id: city.id,
      label: city.name,
    }))

  if (activeCity) {
    selectOptions.push({ label: viewAllLabel || es_EC.VIEW_ALL, id: null })
  }

  return (
    <div className="map-locations-component">
      <div
        className="locations-map"
        ref={mapContainer}
        style={{ height: mapHeight, width: mapWidth }}
      >
        {!!mapHeader && mapHeader}
        {isLoaded ? renderMap() : es_EC.LOADING}
      </div>
      <div className="locations-nav">
        <div className="location-selector">
          <SelectComponent
            extraSelectClassName={selectorExtraClass}
            label={label}
            options={selectOptions}
            valueId="selectedCity"
            onChangeValue={selectCity}
            placeholder={placeholder || es_EC.PLACEHOLDER}
            value={
              defaultSelectedCity && !activeCity
                ? defaultSelectedCity.id
                : activeCity
            }
          />
        </div>
        <div
          className="location-list"
          style={{ height: `calc(${mapHeight} - 4rem)` }}
        >
          {!!title && <h2 className={titleExtraClass}>{title}</h2>}
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
    </div>
  )
}

export default MapLocationsComponent

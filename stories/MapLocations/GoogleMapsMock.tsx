import { IAbstractProp } from '../../utils/interface/SharedInterface'
import React from 'react'

export const googleMock = (mockLatLng): IAbstractProp =>
  ({
    maps: {
      LatLngBounds: jest.fn().mockImplementation(() => ({
        extend: jest.fn(),
        getCenter: jest.fn().mockImplementation(mockLatLng),
        getNorthEast: jest.fn().mockImplementation(mockLatLng),
        getSouthWest: jest.fn().mockImplementation(mockLatLng),
      })),
      LatLng: jest.fn(),
    },
  } as IAbstractProp)

export const mockInfoWindow = jest.fn().mockImplementation((props) => (
  <div>
    {props.options.pixelOffset.equals() && <div>Move Mark Location</div>}
    <a onClick={(): IAbstractProp => props.onCloseClick()}>close button</a>
    <span>Active Info Mark</span>
    {props.children}
  </div>
))

export const mockMarker = jest
  .fn()
  .mockImplementation((props) => (
    <div onClick={(): IAbstractProp => props.onClick()}>Marker - Item</div>
  ))

export const mockMarkerCluster = (latReference): IAbstractProp =>
  jest.fn().mockImplementation((props) => (
    <div>
      <a
        onClick={(): IAbstractProp =>
          props.onClick({
            getMarkers: (): IAbstractProp => [
              { position: { lat: (): IAbstractProp => latReference } },
            ],
          })
        }
      >
        Cluster Click
      </a>
      <div>
        Cluster item:{' '}
        {
          props.calculator([
            { position: { lat: (): IAbstractProp => latReference } },
          ]).title
        }
      </div>
      {props.children()}
    </div>
  ))

export const mockGoogleMap = jest.fn().mockImplementation((props) => (
  <div>
    <div>Google Map is Load</div>
    <div>zoom: {props.zoom}</div>
    {props.children}
  </div>
))

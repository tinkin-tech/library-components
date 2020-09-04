import {
  paramsArrayToString,
  getQueryParams,
  getQueryParamsArray,
  updateUrlParams,
  removeUrlParams,
} from './urlUtils'
import { setLocationSearchValue } from '../testUtils/testUtils'

describe('urlUtils test', () => {
  describe('when paramsArrayToString fn test', () => {
    it('Should transform arrayParams to string', () => {
      expect(
        paramsArrayToString([
          { key: 'page', value: '3' },
          { key: 'filter', value: 'test' },
        ])
      ).toBe('?page=3&filter=test')
    })
  })

  describe('when getQueryParams fn test', () => {
    const oldWindowLocation = window.location

    afterAll(() => {
      window.location = oldWindowLocation
    })

    it('Should return object with params in location search', () => {
      setLocationSearchValue('?param1=hello&param2=world')
      expect(getQueryParams()).toMatchObject({
        param1: 'hello',
        param2: 'world',
      })
    })

    it('Should return object with params of variableData', () => {
      expect(getQueryParams('?filter=true&order=false')).toMatchObject({
        filter: true,
        order: false,
      })
    })

    it(
      'Should return empty object with params when pass variableData ' +
        'empty',
      () => {
        expect(getQueryParams('')).toMatchObject({})
      }
    )
  })

  describe('when getQueryParamsArray fn test', () => {
    it('Should return array object with param in location search', () => {
      setLocationSearchValue('?value=1')
      expect(getQueryParamsArray()).toMatchObject([
        {
          key: 'value',
          value: '1',
        },
      ])
    })

    it('Should return array object with params in variableData', () => {
      expect(getQueryParamsArray('?filter=true&filter=false')).toMatchObject([
        {
          key: 'filter',
          value: true,
        },
        {
          key: 'filter',
          value: false,
        },
      ])
    })

    it('Should return empty array when variableData is empty', () => {
      expect(getQueryParamsArray('')).toMatchObject([])
    })
  })

  describe('when updateUrlParams fn test', () => {
    it('Should update urlParams with passed in props and return params', () => {
      setLocationSearchValue('?value=1')
      expect(updateUrlParams('filter', 'true')).toBe('?value=1&filter=true')
    })

    it(
      'Should update urlParams of params with passed in props and return ' +
        'params',
      () => {
        expect(updateUrlParams('filter', 'true', '?filter=false')).toBe(
          '?filter=true'
        )
      }
    )
  })

  describe('when removeUrlParams fn test', () => {
    it('Should remove param equal of paramName in location search', () => {
      setLocationSearchValue('?value=1&search=text')
      expect(removeUrlParams('value')).toBe('?search=text')
    })

    it('Should remove param equal of paramName in params prop', () => {
      expect(removeUrlParams('search', '?value=1&search=text')).toBe('?value=1')
    })
  })
})

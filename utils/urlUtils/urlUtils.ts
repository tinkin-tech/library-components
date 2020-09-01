interface IQueryParam {
  key: string
  value: string | boolean
}

export const paramsArrayToString = (params: IQueryParam[]): string => {
  let url = ''
  params.forEach((item, key) => {
    const prefix = key === 0 ? '?' : '&'
    url += `${prefix}${item.key}=${item.value}`
  })
  return url
}

export const getQueryParams = (
  variableData?: string
): {
  [name: string]: string | boolean
} => {
  const variable =
    variableData || variableData === '' ? variableData : window.location.search
  const vars = variable.split('&')
  const params: {
    [name: string]: string | boolean
  } = {}
  for (const row of vars) {
    const pair = row.split('=')
    if (pair.length === 2) {
      const paramKey = pair[0].replace(/\?/g, '')
      params[paramKey] =
        pair[1] === 'true'
          ? true
          : pair[1] === 'false'
          ? false
          : pair[1].replace(/%20/g, ' ')
    }
  }
  return params
}

export const getQueryParamsArray = (variableData?: string): IQueryParam[] => {
  const variable =
    variableData || variableData === '' ? variableData : window.location.search
  const vars = variable.split('&')
  const params: IQueryParam[] = []
  for (const row of vars) {
    const pair = row.split('=')
    if (pair.length === 2) {
      const paramKey = pair[0].replace(/\?/g, '')
      params.push({
        key: paramKey,
        value:
          pair[1] === 'true'
            ? true
            : pair[1] === 'false'
            ? false
            : pair[1].replace(/%20/g, ' '),
      })
    }
  }
  return params
}

export const updateUrlParams = (
  paramName: string,
  value: string | boolean | number,
  params?: string
): string => {
  const urlParams = getQueryParamsArray(
    params || window.location.search
  ).filter((item) => item.key !== paramName)
  urlParams.push({ key: paramName, value: value.toString() })
  return paramsArrayToString(urlParams)
}

export const removeUrlParams = (paramName: string, params?: string): string => {
  const urlParams = getQueryParamsArray(
    params || params === '' ? params : window.location.search
  ).filter((item) => item.key !== paramName)
  return paramsArrayToString(urlParams)
}

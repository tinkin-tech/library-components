export class TestUtil {
  private value: string
  private valueId: string

  mockedFunction = (value: string, valueId: string): void => {
    this.setValue(value)
    this.setValueId(valueId)
  }

  getValue = (): string => {
    return this.value
  }

  getValueId = (): string => {
    return this.valueId
  }

  private setValue = (value: string): void => {
    this.value = value
  }

  private setValueId = (valueId: string): void => {
    this.valueId = valueId
  }
}

export const setLocationSearchValue = (search: string): void => {
  const oldWindowLocation = window.location
  delete window.location

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      search: {
        configurable: true,
        value: search,
      },
    }
  )
}

export class TestUtil {
  private value: string

  mockedFunction = (value: string, _: string): void => {
    this.setValue(value)
  }

  getValue = (): string => {
    return this.value
  }

  private setValue = (value: string): void => {
    this.value = value
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

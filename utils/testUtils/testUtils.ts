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

export const mockOffsetAndClientSizes = (value?: number): void => {
  const originalClientHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'clientHeight'
  )
  const originalClientWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'clientWidth'
  )
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  )
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  )
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: value || 500,
    })
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: value || 500,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: value || 500,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: value || 500,
    })
  })

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      'clientHeight',
      originalClientHeight
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'clientWidth',
      originalClientWidth
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetHeight
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetWidth
    )
  })
}

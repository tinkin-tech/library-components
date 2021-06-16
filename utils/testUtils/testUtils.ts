export class TestUtil {
  private value: string

  mockedFunction = (value: string, _: string): void => {
    this.setValue(value)
  }

  getValue = (): string => this.value

  private setValue = (value: string): void => {
    this.value = value
  }
}

export const setLocationSearchValue = (search: string): void => {
  const oldWindowLocation = window.location
  delete window.location

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

/* istanbul ignore next */
export const mockOffsetAndClientSizes = (value?: number): void => {
  const defaultValue = 500

  const originalClientHeight = Object.getOwnPropertyDescriptor(
    Element.prototype,
    'clientHeight'
  )
  const originalClientWidth = Object.getOwnPropertyDescriptor(
    Element.prototype,
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
    Object.defineProperty(Element.prototype, 'clientHeight', {
      configurable: true,
      value: value || defaultValue,
    })
    Object.defineProperty(Element.prototype, 'clientWidth', {
      configurable: true,
      value: value || defaultValue,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: value || defaultValue,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: value || defaultValue,
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

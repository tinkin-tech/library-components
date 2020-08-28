export class TestUtil {
  value: string
  valueId: string

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

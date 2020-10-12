export type IAddAndSubtractDateTypes =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'

export type ICompareDatesTypes = 'less' | 'greater' | 'equal'

export type IFormatTypes =
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'HH:mm DD-MM-YYYY'
  | 'YYYY-MM-DD'
  | 'YYYY-MM'
  | 'MM-DD-YYYY'
  | 'DD-MM-YYYY HH:mm'
  | 'DD-MM-YYYY HH:mm:ss'
  | 'DD-MM-YYYY'
  | 'MM-YYYY'
  | 'MM-DD'
  | 'YYYY'
  | 'MM'
  | 'DD'

interface IObjectDate {
  year?: string
  month?: string
  day?: string
  hours?: string
  minutes?: string
  seconds?: string
}

const split = (dateFormat: string): string[] =>
  dateFormat
    .toString()
    .split('-')
    .toString()
    .split(' ')
    .toString()
    .split(':')
    .toString()
    .split(',')

const millisecondsInASecond = 1000
const millisecondsInAMinute = 60000
const millisecondsInAnHour = 3600000
const daysInAWeek = 7

export default class DateUtils {
  static transformDateStringToDate(date: string, format: IFormatTypes): Date {
    const dateFormat = {
      DD: 1,
      HH: 0,
      MM: 1,
      YYYY: 1,
      mm: 0,
      ss: 0,
    }
    const dateSplit = typeof date === 'string' && split(date)
    const formatSplit = split(format)
    formatSplit.map((item, key) => {
      switch (item) {
        case 'YYYY':
          dateFormat.YYYY = parseInt(
            dateFormat.YYYY.toString().replace('1', dateSplit[key]),
            10
          )
          break
        case 'MM':
          dateFormat.MM = parseInt(
            dateFormat.MM.toString().replace(
              '1',
              (parseInt(dateSplit[key], 10) - 1).toString()
            ),
            10
          )
          break
        case 'DD':
          dateFormat.DD = parseInt(
            dateFormat.DD.toString().replace(
              '1',
              parseInt(dateSplit[key], 10).toString()
            ),
            10
          )
          break
        case 'HH':
          dateFormat.HH = parseInt(
            dateFormat.HH.toString().replace('0', dateSplit[key]),
            10
          )
          break
        case 'mm':
          dateFormat.mm = parseInt(
            dateFormat.mm.toString().replace('0', dateSplit[key]),
            10
          )
          break
        case 'ss':
          dateFormat.ss = parseInt(
            dateFormat.ss.toString().replace('0', dateSplit[key]),
            10
          )
          break
      }
      return null
    })
    return new Date(
      dateFormat.YYYY,
      dateFormat.MM,
      dateFormat.DD,
      dateFormat.HH,
      dateFormat.mm,
      dateFormat.ss
    )
  }

  static formatDate(
    datetoTranform: Date | string,
    format: IFormatTypes,
    newFormat: IFormatTypes
  ): string {
    const date =
      typeof datetoTranform === 'string'
        ? this.transformDateStringToDate(datetoTranform, format)
        : datetoTranform
    const dateTimeFormatObject = new Intl.DateTimeFormat('en-US-u-hc-h23', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
    ] = dateTimeFormatObject.formatToParts(date)
    return newFormat
      .replace(/YYYY/g, year)
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hour)
      .replace(/mm/g, minute)
      .replace(/ss/g, second)
  }

  static addDate(
    date: string,
    format: IFormatTypes,
    units: number,
    option: IAddAndSubtractDateTypes
  ): string {
    let newDate = this.transformDateStringToDate(date, format)
    if (units <= 0) {
      newDate = null
    } else {
      switch (option.toLowerCase()) {
        case 'seconds':
          newDate.setTime(newDate.getTime() + units * millisecondsInASecond)
          break
        case 'minutes':
          newDate.setTime(newDate.getTime() + units * millisecondsInAMinute)
          break
        case 'hours':
          newDate.setTime(newDate.getTime() + units * millisecondsInAnHour)
          break
        case 'days':
          newDate.setDate(newDate.getDate() + units)
          break
        case 'weeks':
          newDate.setDate(newDate.getDate() + daysInAWeek * units)
          break
        case 'months':
          newDate.setMonth(newDate.getMonth() + units)
          break
        case 'years':
          newDate.setFullYear(newDate.getFullYear() + units)
      }
    }
    return this.formatDate(newDate, format, format)
  }

  static substractDate(
    date: string,
    format: IFormatTypes,
    units: number,
    option: IAddAndSubtractDateTypes
  ): string {
    let newDate = this.transformDateStringToDate(date, format)
    if (units < 0) {
      newDate = null
    } else {
      switch (option.toLowerCase()) {
        case 'seconds':
          newDate.setTime(newDate.getTime() - units * millisecondsInASecond)
          break
        case 'minutes':
          newDate.setTime(newDate.getTime() - units * millisecondsInAMinute)
          break
        case 'hours':
          newDate.setTime(newDate.getTime() - units * millisecondsInAnHour)
          break
        case 'days':
          newDate.setDate(newDate.getDate() - units)
          break
        case 'weeks':
          newDate.setDate(newDate.getDate() - daysInAWeek * units)
          break
        case 'months':
          newDate.setMonth(newDate.getMonth() - units)
          break
        case 'years':
          newDate.setFullYear(newDate.getFullYear() - units)
      }
    }
    return this.formatDate(newDate, format, format)
  }

  static compareDates(
    date: string,
    format: IFormatTypes,
    comparedDate: string,
    options: ICompareDatesTypes
  ): boolean {
    switch (options.toLowerCase()) {
      case 'less':
        return (
          this.transformDateStringToDate(date, format).getTime() <
          this.transformDateStringToDate(comparedDate, format).getTime()
        )
      case 'greater':
        return (
          this.transformDateStringToDate(date, format).getTime() >
          this.transformDateStringToDate(comparedDate, format).getTime()
        )
      case 'equal':
        return (
          this.transformDateStringToDate(date, format).getTime() ===
          this.transformDateStringToDate(comparedDate, format).getTime()
        )
    }
    return null
  }

  static getDaysInMonth(date: string, format: IFormatTypes): number {
    const transformDate = this.transformDateStringToDate(date, format)
    return new Date(
      transformDate.getFullYear(),
      transformDate.getMonth() + 1,
      0
    ).getDate()
  }

  static changeStringDateSeparator(date: string, separator: string): string {
    const regExp = new RegExp(`[${separator}]`, 'g')
    return date.replace(regExp, '-')
  }

  static transformDateStringToUnix(
    dateString: string,
    format: IFormatTypes
  ): number {
    const date = this.transformDateStringToDate(dateString, format)
    const milliseconds = 1000
    return date.getTime() / milliseconds
  }

  static setYear(date: string, format: IFormatTypes, year: number): string {
    const transformDate = this.transformDateStringToDate(date, format)
    transformDate.setFullYear(year)
    return this.formatDate(transformDate, null, format)
  }

  static setMonth(date: string, format: IFormatTypes, month: number): string {
    const transformDate = this.transformDateStringToDate(date, format)
    transformDate.setMonth(month - 1)
    return this.formatDate(transformDate, null, format)
  }

  static setDay(date: string, format: IFormatTypes, day: number): string {
    const transformDate = this.transformDateStringToDate(date, format)
    transformDate.setDate(day)
    return this.formatDate(transformDate, null, format)
  }

  static yearsDiff(
    firstDate: string,
    secondDate: string,
    format: IFormatTypes
  ): number {
    const transformFirstDate = this.transformDateStringToDate(firstDate, format)
    const transformSecondDate = this.transformDateStringToDate(
      secondDate,
      format
    )
    return transformFirstDate.getFullYear() - transformSecondDate.getFullYear()
  }

  static getFullYear(date: string, formatDate: IFormatTypes): number {
    const tranformDate = this.transformDateStringToDate(date, formatDate)
    return tranformDate.getFullYear()
  }

  static monthsDiff(
    firstDate: string,
    secondDate: string,
    format: IFormatTypes
  ): number {
    const transformFirstDate = this.transformDateStringToDate(firstDate, format)
    const transformSecondDate = this.transformDateStringToDate(
      secondDate,
      format
    )
    const monthsInYear = 12
    return (
      transformFirstDate.getFullYear() * monthsInYear +
      transformFirstDate.getMonth() -
      transformSecondDate.getFullYear() * monthsInYear +
      transformSecondDate.getMonth()
    )
  }

  static daysDiff(
    firstDate: string,
    secondDate: string,
    format: IFormatTypes
  ): number {
    const transformFirstDate = this.transformDateStringToDate(firstDate, format)
    const transformSecondDate = this.transformDateStringToDate(
      secondDate,
      format
    )
    const dateTime =
      transformFirstDate.getTime() - transformSecondDate.getTime()
    const millisecondsInASecond = 1000
    const secondsInAHour = 3600
    const hoursInADay = 24
    return dateTime / (millisecondsInASecond * secondsInAHour * hoursInADay)
  }

  static dateFormatToArray = (dateFormat: IFormatTypes): string[] =>
    dateFormat.replace(new RegExp(`[: ]`, 'g'), '-').split('-')

  static dateKeys = {
    YYYY: 'year',
    MM: 'month',
    DD: 'day',
    HH: 'hours',
    mm: 'minutes',
    ss: 'seconds',
  }

  static dateStringToObject(
    date: string,
    dateFormat: IFormatTypes
  ): IObjectDate {
    return this.dateFormatToArray(dateFormat).reduce(
      (accumulator, value: IFormatTypes) => {
        accumulator[this.dateKeys[value]] = this.formatDate(
          date,
          dateFormat,
          value
        )
        return accumulator
      },
      {}
    )
  }
}

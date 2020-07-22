export type AddAndSubtractDateTypes =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'

export type CompareDatesTypes = 'less' | 'greater' | 'equal'

export type FormatTypes =
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
  | 'YYYY'
  | 'MM'
  | 'DD'

const split = (dateFormat: string): string[] => {
  return dateFormat
    .toString()
    .split('-')
    .toString()
    .split(' ')
    .toString()
    .split(':')
    .toString()
    .split(',')
}

export default class DateUtils {
  static transformDateStringToDate(date: string, format: FormatTypes): Date {
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
    format: FormatTypes,
    newFormat: FormatTypes
  ): string {
    const date =
      typeof datetoTranform === 'string'
        ? this.transformDateStringToDate(datetoTranform, format)
        : datetoTranform
    const dateTimeFormatObject = new Intl.DateTimeFormat('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
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
    format: FormatTypes,
    units: number,
    option: AddAndSubtractDateTypes
  ): string {
    let newDate = this.transformDateStringToDate(date, format)
    if (units <= 0) {
      newDate = null
    } else {
      switch (option.toLowerCase()) {
        case 'seconds':
          newDate.setTime(newDate.getTime() + units * 1000)
          break
        case 'minutes':
          newDate.setTime(newDate.getTime() + units * 60000)
          break
        case 'hours':
          newDate.setTime(newDate.getTime() + units * 3600000)
          break
        case 'days':
          newDate.setDate(newDate.getDate() + units)
          break
        case 'weeks':
          newDate.setDate(newDate.getDate() + 7 * units)
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
    format: FormatTypes,
    units: number,
    option: AddAndSubtractDateTypes
  ): string {
    let newDate = this.transformDateStringToDate(date, format)
    if (units < 0) {
      newDate = null
    } else {
      switch (option.toLowerCase()) {
        case 'seconds':
          newDate.setTime(newDate.getTime() - units * 1000)
          break
        case 'minutes':
          newDate.setTime(newDate.getTime() - units * 60000)
          break
        case 'hours':
          newDate.setTime(newDate.getTime() - units * 3600000)
          break
        case 'days':
          newDate.setDate(newDate.getDate() - units)
          break
        case 'weeks':
          newDate.setDate(newDate.getDate() - 7 * units)
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
    format: FormatTypes,
    comparedDate: string,
    options: CompareDatesTypes
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

  static getDaysInMonth(date: string, format: FormatTypes): number {
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
    format: FormatTypes
  ): number {
    const date = this.transformDateStringToDate(dateString, format)
    return date.getTime() / 1000
  }
}

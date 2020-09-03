import DateUtils, {
  IFormatTypes,
  IAddAndSubtractDateTypes,
  ICompareDatesTypes,
} from './dateUtils'

describe('Test for date utils', () => {
  describe('Tests for transformDateStringToDate function', () => {
    it(
      'Given string date with format "YYYY-MM-DD HH:mm",' +
        'transformDateStringToDate() returns date',
      () => {
        expect(
          DateUtils.transformDateStringToDate(
            '2020-01-01 12:00',
            'YYYY-MM-DD HH:mm'
          )
        ).toMatchObject(expect.any(Object))
      }
    )

    it(
      'Given string date with format "DD-MM-YYYY", ' +
        'transformDateStringToDate returns date',
      () => {
        expect(
          DateUtils.transformDateStringToDate('20-01-2020', 'DD-MM-YYYY')
        ).toMatchObject(expect.any(Object))
      }
    )

    it(
      'Given string date with format "YYYY", ' +
        'transformDateStringToDate returns date',
      () => {
        expect(
          DateUtils.transformDateStringToDate('2019', 'YYYY')
        ).toMatchObject(expect.any(Object))
      }
    )
  })

  describe('Test for formatDate function', () => {
    it(
      'Given string date with format "DD-MM-YYYY HH:mm", ' +
        'formatDate() given new format' +
        '"YYYY-MM-DD" then returns string date with new format ',
      () => {
        expect(
          DateUtils.formatDate(
            '20-06-2016 18:30',
            'DD-MM-YYYY HH:mm',
            'YYYY-MM-DD'
          )
        ).toBe('2016-06-20')
      }
    )

    it(
      'Given new format "DD", formatDate() returns current' +
        'date with format "DD"',
      () => {
        const currentDay = new Date().getDate()
        expect(DateUtils.formatDate(new Date(), null, 'DD')).toBe(
          +currentDay >= 10 ? currentDay : `0${currentDay}`
        )
      }
    )

    it(
      'Given new format "YYYY-MM" and date, formatDate() returns date ' +
        'with format "YYYY-MM"',
      () => {
        expect(
          DateUtils.formatDate(
            new Date('2019-02-01T05:00:00.000Z'),
            null,
            'YYYY-MM'
          )
        ).toBe('2019-02')
      }
    )

    it(
      'Given new format "MM-YYYY", date and any format, formatDate() ' +
        'returns date with format "MM-YYYY" ',
      () => {
        expect(
          DateUtils.formatDate(
            new Date('2019-02-01T05:00:00.000Z'),
            null,
            'MM-YYYY'
          )
        ).toBe('02-2019')
      }
    )
  })

  describe('Tests for addDate function', () => {
    const date = '20-06-2016 07:08:20'
    const format = 'DD-MM-YYYY HH:mm:ss'

    const cases = [
      [date, format, 10, 'seconds', '20-06-2016 07:08:30'],
      [date, format, 1, 'minutes', '20-06-2016 07:09:20'],
      [date, format, 1, 'hours', '20-06-2016 08:08:20'],
      [date, format, 1, 'days', '21-06-2016 07:08:20'],
      [date, format, 1, 'weeks', '27-06-2016 07:08:20'],
      [date, format, 1, 'months', '20-07-2016 07:08:20'],
      [date, format, 1, 'years', '20-06-2017 07:08:20'],
      [date, format, -1, 'years', '01-01-1970 00:00:00'],
    ]

    it.each(cases)(
      'Given %p date with %p format, %p option and %p units, ' +
        'addDate() returns %p',
      (
        testDate: string,
        testFormat: IFormatTypes,
        testUnits: number,
        testOption: IAddAndSubtractDateTypes,
        testResult: string
      ) => {
        const result = DateUtils.addDate(
          testDate,
          testFormat,
          testUnits,
          testOption
        )
        expect(result).toBe(testResult)
      }
    )
  })

  describe('Tests for subtractDate() function', () => {
    const date = '2020-06-24 12:30:00'
    const format = 'YYYY-MM-DD HH:mm:ss'

    const cases = [
      [date, format, 10, 'seconds', '2020-06-24 12:29:50'],
      [date, format, 1, 'minutes', '2020-06-24 12:29:00'],
      [date, format, 1, 'hours', '2020-06-24 11:30:00'],
      [date, format, 1, 'days', '2020-06-23 12:30:00'],
      [date, format, 1, 'weeks', '2020-06-17 12:30:00'],
      [date, format, 1, 'months', '2020-05-24 12:30:00'],
      [date, format, 1, 'years', '2019-06-24 12:30:00'],
      [date, format, -1, 'years', '1970-01-01 00:00:00'],
    ]

    it.each(cases)(
      'Given %p date with %p format, %p option and %p units, ' +
        'subtractDate() returns %p',
      (
        testDate: string,
        testFormat: IFormatTypes,
        testUnits: number,
        testOption: IAddAndSubtractDateTypes,
        testResult: string
      ) => {
        const result = DateUtils.substractDate(
          testDate,
          testFormat,
          testUnits,
          testOption
        )
        expect(result).toBe(testResult)
      }
    )
  })

  describe('Tests for compareDates() function', () => {
    const format = 'DD-MM-YYYY'
    const date = '10-12-2020'
    const compareDate = '11-12-2020'

    const cases = [
      [date, compareDate, format, 'less', true],
      [compareDate, date, format, 'less', false],
      [date, compareDate, format, 'greater', false],
      [compareDate, date, format, 'greater', true],
      [date, compareDate, format, 'equal', false],
      [compareDate, compareDate, format, 'equal', true],
      [compareDate, compareDate, format, '', null],
    ]

    it.each(cases)(
      'Given date %p, compareDate %p, format %p and option %p, ' +
        'compareDates() returns %p',
      (
        testDate: string,
        testCompareDate: string,
        testFormat: IFormatTypes,
        testOptions: ICompareDatesTypes,
        testResult: boolean
      ) => {
        expect(
          DateUtils.compareDates(
            testDate,
            testFormat,
            testCompareDate,
            testOptions
          )
        ).toBe(testResult)
      }
    )
  })

  describe('Tests for getDaysInMonth() functions', () => {
    it('Given string date, getDaysInMonth() returns days', () => {
      expect(DateUtils.getDaysInMonth('10-12-2020', 'DD-MM-YYYY')).toBe(31)
    })

    it(
      'Given string date with format "MM-DD-YYYY", getDaysInMonth() ' +
        'returns days',
      () => {
        expect(DateUtils.getDaysInMonth('12-02-2020', 'MM-DD-YYYY')).toBe(31)
      }
    )
  })

  describe('Tests for changeStringDateSeparator() functions', () => {
    it(
      'Given string date with / separator, changeStringDateSeparator() ' +
        'returns string date with - separator',
      () => {
        expect(DateUtils.changeStringDateSeparator('12/10/2020', '/')).toBe(
          '12-10-2020'
        )
      }
    )
  })

  describe('Tests for transformDateStringToUnix() functions', () => {
    it(
      'Given string date and format, transformDateStringToUnix() returns ' +
        'timestamp',
      () => {
        expect(
          DateUtils.transformDateStringToUnix('01-01-2019', 'DD-MM-YYYY')
        ).toBe(1546300800)
      }
    )
  })

  describe('Tests for setYear() function', () => {
    it(
      'Given string date, format and full year, returns string date with' +
        'given year',
      () => {
        expect(DateUtils.setYear('01-01-2010', 'DD-MM-YYYY', 2020)).toBe(
          '01-01-2020'
        )
      }
    )
  })

  describe('Tests for setMonth() function', () => {
    it(
      'Given sting date, format and month, returns string date with' +
        'given month',
      () => {
        expect(DateUtils.setMonth('2020-01-10', 'YYYY-MM-DD', 4)).toBe(
          '2020-04-10'
        )
      }
    )
  })

  describe('Tests for setDay() function', () => {
    it(
      'Given string date, format and day, returns string date with ' +
        'given day',
      () => {
        expect(DateUtils.setDay('10-12-2020', 'DD-MM-YYYY', 25)).toBe(
          '25-12-2020'
        )
      }
    )
  })

  describe('Tests for yearsDiff() function', () => {
    it(
      'Given two strings dates, first the bigger and format of dates, returns' +
        'diff of years',
      () => {
        expect(
          DateUtils.yearsDiff('2020-01-30', '2013-02-23', 'YYYY-MM-DD')
        ).toBe(7)
      }
    )
  })

  describe('Tests for getFullYear() function', () => {
    it('Given string date and format, returns full year', () => {
      expect(DateUtils.getFullYear('2020-01-01', 'YYYY-MM-DD')).toBe(2020)
    })
  })

  describe('Tests for monthsDiff() function', () => {
    it('Given two strings dates return diff in months', () => {
      expect(
        DateUtils.monthsDiff('2020-01-01', '2019-01-01', 'YYYY-MM-DD')
      ).toBe(12)
    })
  })

  describe('Tests for daysDiff() function', () => {
    it('Given two strings dates return diff in days', () => {
      expect(DateUtils.daysDiff('2020-02-01', '2020-01-01', 'YYYY-MM-DD')).toBe(
        31
      )
    })
  })

  describe('Test dateStringToObject', () => {
    const cases = [
      ['2019-02-23', 'YYYY-MM-DD', { year: '2019', month: '02', day: '23' }],
      ['2019-02', 'YYYY-MM', { year: '2019', month: '02' }],
      ['02-23', 'MM-DD', { month: '02', day: '23' }],
      ['2019', 'YYYY', { year: '2019' }],
      ['02', 'MM', { month: '02' }],
      ['23', 'DD', { day: '23' }],
      [
        '2019-02-23 12:13:14',
        'YYYY-MM-DD HH:mm:ss',
        {
          year: '2019',
          month: '02',
          day: '23',
          hours: '12',
          minutes: '13',
          seconds: '14',
        },
      ],
    ]

    it.each(cases)(
      'Given %p date and %p format should return %p',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (date: string, dateFormat: IFormatTypes, result: any) => {
        expect(DateUtils.dateStringToObject(date, dateFormat)).toEqual(result)
      }
    )
  })
})

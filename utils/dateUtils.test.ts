import DateUtils from './dateUtils'

describe('Test for date utils', () => {
  describe('Tests for transformDateStringToDate function', () => {
    it(
      'Given string date with format "YYYY-MM-DD HH:mm",' +
        'transformDateStringToDate() returns date',
      async () => {
        expect(
          DateUtils.transformDateStringToDate(
            '2020-01-01 12:00',
            'YYYY-MM-DD HH:mm'
          )
        ).toMatchObject(new Date('2020-01-01T17:00:00.000Z'))
      }
    )

    /*it('Given string date with format "DD-MM-YYYY", transformDateStringToDate returns date', async () => {
      expect(transformDateStringToDate('20-01-2020', 'DD-MM-YYYY'))
        .toMatchObject(new Date('2020-01-20T05:00:00.000Z'));
    });

    it('Given string date with format "YYYY", transformDateStringToDate returns date', async () => {
      expect(transformDateStringToDate('2019', 'YYYY')).toMatchObject(new Date('2019-02-01T05:00:00.000Z'));
    });

  });

  describe('Test for formatDate function', () => {

    it('Given string date with format "DD-MM-YYYY HH:mm", formatDate() given new format' +
      '"YYYY-MM-DD" then returns string date with new format ', async () => {
      expect(formatDate('YYYY-MM-DD', '23-06-2020 18:30', 'DD-MM-YYYY HH:mm'))
        .toBe('2020-06-23');
    });

    it('Given new format "DD", formatDate() returns current date with format "DD"', async () => {
      expect(formatDate('DD')).toBe(new Date().getUTCDate().toLocaleString());
    });

    it('Given new format "YYYY-MM" and date, formatDate() returns date with format "YYYY-MM"', async () => {
      expect(formatDate('YYYY-MM', new Date('2019-02-01T05:00:00.000Z'))).toBe('2019-02');
    });

    it('Given new format "MM-YYYY", date and any format, formatDate() returns date with format "MM-YYYY" ', async () => {
      expect(formatDate('MM-YYYY', new Date('2019-02-01T05:00:00.000Z'), 'DD-MM-YYYY'))
        .toBe('02-2019');
    });

  });

  describe('Tests for addDate function', () => {

    const date = '10-01-2020 12:30:00';
    const format = 'DD-MM-YYYY HH:mm:ss';

    const cases = [
      [date, format, 'seconds', 10, "10-01-2020 12:30:10"],
      [date, format, 'minutes', 1, "10-01-2020 12:31:00"],
      [date, format, 'hours', 1, "10-01-2020 13:30:00"],
      [date, format, 'days', 1, "11-01-2020 12:30:00"],
      [date, format, 'weeks', 1, "17-01-2020 12:30:00"],
      [date, format, 'months', 1, "10-02-2020 12:30:00"],
      [date, format, 'years', 1, "10-01-2021 12:30:00"]
    ];

    it.each(cases)(
      "Given %p date with %p format, %p option and %p units, addDate() returns %p",
      (
        testDate: string,
        testFormat: IFormatTypes,
        testOption: IAddAndSubtractDateTypes,
        testUnits: number,
        testResult: string
      ) => {
        const result = addDate(testDate, testFormat, testOption, testUnits);
        expect(result).toBe(testResult);
      }
    );

  });

  describe('Tests for subtractDate() functions', () => {

    const date = '2020-06-24 12:30:00';
    const format = 'YYYY-MM-DD HH:mm:ss';

    const cases = [
      [date, format, 'seconds', 10, "2020-06-24 12:29:50"],
      [date, format, 'minutes', 1, "2020-06-24 12:29:00"],
      [date, format, 'hours', 1, "2020-06-24 11:30:00"],
      [date, format, 'days', 1, "2020-06-23 12:30:00"],
      [date, format, 'weeks', 1, "2020-06-17 12:30:00"],
      [date, format, 'months', 1, "2020-05-24 12:30:00"],
      [date, format, 'years', 1, "2019-06-24 12:30:00"]
    ];

    it.each(cases)(
      "Given %p date with %p format, %p option and %p units, subtractDate() returns %p",
      (
        testDate: string,
        testFormat: IFormatTypes,
        testOption: IAddAndSubtractDateTypes,
        testUnits: number,
        testResult: string
      ) => {
        const result = subtractDate(testDate, testFormat, testOption, testUnits);
        expect(result).toBe(testResult);
      }
    );

  });

  describe('Tests for compareDates() function', () => {

    const format = 'DD-MM-YYYY';
    const date = '10-12-2020';
    const compareDate = '11-12-2020';

    const cases = [
      [date, compareDate, format, 'less', true],
      [compareDate, date, format, 'less', false],
      [date, compareDate, format, 'greater', false],
      [compareDate, date, format, 'greater', true],
      [date, compareDate, format, 'equal', false],
      [compareDate, compareDate, format, 'equal', true],
      [compareDate, compareDate, format, '', null]
    ];

    it.each(cases)(
      'Given date %p, compareDate %p, format %p and option %p, compareDates() returns %p',
      (
        testDate: string,
        testCompareDate: string,
        testFormat: IFormatTypes,
        testOptions: ICompareDatesTypes,
        testResult: boolean
      ) => {
        expect(compareDates(testDate, testCompareDate, testFormat, testOptions)).toBe(testResult);
      }
    );

  });

  describe('Tests for getDaysInMonth() functions', () => {

    it('Given string date, getDaysInMonth() returns days', async () => {
      expect(getDaysInMonth('10-12-2020', 'DD-MM-YYYY')).toBe(31);
    });

    it('Given string date with format "MM-DD-YYYY", getDaysInMonth() returns days', async () => {
      expect(getDaysInMonth('12-02-2020', 'MM-DD-YYYY')).toBe(31);
    });

  });

  describe('Tests for changeStringDateSeparator() functions', () => {

    it('Given string date with / separator, changeStringDateSeparator() returns string date with - separator', async () => {
      expect(changeStringDateSeparator('/', '12/10/2020')).toBe('12-10-2020');
    });

  });

  describe('Tests for transformDateStringToUnix() functions', () => {

    it('Given string date and format, transformDateStringToUnix() returns timestamp', async () => {
      expect(transformDateStringToUnix('01-01-2019', 'DD-MM-YYYY')).toBe(1546318800);
    });
*/
  });

});

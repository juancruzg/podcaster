import { formatDate, millisToHoursMinutesAndSeconds, millisToMinutesAndSeconds, millisToTime, padTo2Digits } from '../../../app/utils/date';

describe('Date', () => {
  describe('padTo2Digits', () => {
    test('pads number to 2 digits', () => {
      const paddedNumber = padTo2Digits(2);

      expect(paddedNumber).toBe('02');
    });

    test('does not pad if number is already to 2 digits', () => {
      const paddedNumber = padTo2Digits(20);

      expect(paddedNumber).toBe('20');
    });
  });

  describe('formatDate', () => {
    test('format date to dd/mm/yyyy', () => {
      const formattedDate = formatDate(new Date('2022-05-20 15:00:00.000'));

      expect(formattedDate).toBe('20/05/2022');
    });
  });

  describe('millisToMinutesAndSeconds', () => {
    test('converts milliseconds into 00:ss time stamp', () => {
      const time = millisToMinutesAndSeconds(20000);

      expect(time).toBe('00:20');
    });

    test('converts milliseconds into mm:ss time stamp', () => {
      const time = millisToMinutesAndSeconds(2000000);

      expect(time).toBe('33:20');
    });
  });

  describe('millisToHoursMinutesAndSeconds', () => {
    test('converts milliseconds into 00:00:ss time stamp', () => {
      const time = millisToHoursMinutesAndSeconds(20000);

      expect(time).toBe('00:00:20');
    });

    test('converts milliseconds into 00:mm:ss time stamp', () => {
      const time = millisToHoursMinutesAndSeconds(2000000);

      expect(time).toBe('00:33:20');
    });

    test('converts milliseconds into hh:mm:ss time stamp', () => {
      const time = millisToHoursMinutesAndSeconds(200000000);

      expect(time).toBe('07:33:20');
    });
  });

  describe('millisToTime', () => {
    test('converts milliseconds into mm:ss time stamp', () => {
      const time = millisToTime(20000);

      expect(time).toBe('00:20');
    });

    test('converts milliseconds into hh:mm:ss time stamp', () => {
      const time = millisToTime(200000000);

      expect(time).toBe('07:33:20');
    });
  });
});

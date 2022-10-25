export const padTo2Digits = (num: number): string => num.toString().padStart(2, '0');

export const formatDate = (date: Date): string =>
  [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');

export const millisToHoursMinutesAndSeconds = (milliseconds: number): string => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const millisToMinutesAndSeconds = (milliseconds: number): string => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor(milliseconds / (1000 * 60));

  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};

export const millisToTime = (milliseconds: number): string => {
  if (milliseconds >= 60 * 60 * 1000) {
    return millisToHoursMinutesAndSeconds(milliseconds);
  }

  return millisToMinutesAndSeconds(milliseconds);
};

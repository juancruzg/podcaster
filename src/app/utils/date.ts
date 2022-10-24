export const padTo2Digits = (num: number): string => num.toString().padStart(2, '0');

export const formatDate = (date: Date): string =>
  [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');

export const millisToMinutesAndSeconds = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds, 10) < 10 ? '0' : ''}${seconds}`;
};

export const nowBySeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const secondsToMills = (unixTimeInSeconds) => {
  return unixTimeInSeconds * 1000;
}

export const dateToSeconds = (date: Date) => {
  return Math.floor(date.getTime() / 1000);
}
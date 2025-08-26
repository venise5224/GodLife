export const toHMS = (time: string): string => {
  const normalized = /^\d{2}:\d{2}$/.test(time) ? `${time}:00` : time;
  return normalized.replace(/:/g, " : ");
};

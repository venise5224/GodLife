export const getTodayKey = (resetHour: number) => {
  const now = new Date();
  now.setHours(now.getHours() - resetHour);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
};

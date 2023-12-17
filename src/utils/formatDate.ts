export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  return `${year}-${padZero(month)}-${padZero(day)}`;
};

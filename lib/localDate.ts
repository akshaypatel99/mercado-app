export const localDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-gb", { year: 'numeric', month: "2-digit", day: "2-digit" });
}

export const isProductCreatedWithin30Days = (date: Date): boolean => {
  const createdDate = new Date(date);
  const now = new Date();

  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  const timeDiffInMs = now.getTime() - createdDate.getTime();

  return thirtyDaysInMilliseconds > timeDiffInMs;
}
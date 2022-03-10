export const localDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-gb", { year: 'numeric', month: "long", day: "numeric" });
}
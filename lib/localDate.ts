export const localDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-gb", { year: 'numeric', month: "2-digit", day: "2-digit" });
}
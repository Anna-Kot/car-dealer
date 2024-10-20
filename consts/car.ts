const currentYear = new Date().getFullYear();

export const yearsList = Array.from(
  { length: currentYear - 2014 },
  (_, i) => currentYear - i
);
export const years = Array.from({ length: currentYear - 2014 }, (_, i) =>
  (currentYear - i).toString()
);

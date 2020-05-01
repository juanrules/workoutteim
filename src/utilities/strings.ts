export const arrayToQueryString = (arr: string[]) =>
  arr
    .map(
      (e: any) =>
        `{${Object.entries(e)
          .map((e) => `"${e[0]}":${e[1]}`)
          .join(",")}}`
    )
    .join(",");

export const generateUniqueId = () =>
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  Math.random().toString(36).substr(2, 9);

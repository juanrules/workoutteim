export const arrayToQueryString = (arr: string[]) =>
  arr
    .map(
      (e: any) =>
        `{${Object.entries(e)
          .map((e) => `"${e[0]}":${e[1]}`)
          .join(",")}}`
    )
    .join(",");

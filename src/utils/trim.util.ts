export const trim = (value?: string) => {
  if (typeof value === "string") {
    return value.replace(/^ +/, "").replace(/ {2,}$/, " ");
  } else {
    return value;
  }
};

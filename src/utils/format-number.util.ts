import numeral from "numeral";

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: number) {
  // Check if the number is greater than 9999
  if (number > 9999) {
    // Format the number to have one decimal place and use 'K' for thousands
    return numeral(number).format("0.0a");
  }

  // Check if the number is less than 100
  if (number < 100) {
    // Format the number to include decimal places if they exist
    return numeral(number).format("0.[00]");
  }

  // If the number is 9999 or less, format it as is
  return numeral(number).format("0,0");
}

export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format("$0,0.00") : "";

  return result(format, ".00");
}

export function fPercent(number: InputValue) {
  if (number === 0) return "0%";

  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

  return result(format, ".0");
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format("0.00a") : "";

  return result(format, ".00");
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format("0.0 b") : "";

  return result(format, ".0");
}

function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}

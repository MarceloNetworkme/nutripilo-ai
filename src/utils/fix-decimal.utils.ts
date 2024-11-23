export const fixDecimal = (value: number | undefined) => (value ? (value % 1 > 0 ? value.toFixed(2).replace(".00", "") : value) : 0);

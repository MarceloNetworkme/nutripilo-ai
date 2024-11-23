import { darken, rgbToHex } from "@mui/system";
import { useMemo } from "react";

export const FillTypes = ["dots", "lines", "squares"];
export const Defs = [
  {
    id: "dots",
    type: "patternDots",
    background: "inherit",
    color: "rgba(255, 255, 255, 0.3)",
    size: 4,
    padding: 1,
    stagger: true,
  },
  {
    id: "lines",
    type: "patternLines",
    background: "inherit",
    color: "rgba(255, 255, 255, 0.3)",
    rotation: -45,
    lineWidth: 6,
    spacing: 10,
  },
  {
    id: "squares",
    type: "patternSquares",
    size: 4,
    padding: 4,
    stagger: false,
    background: "inherit",
    color: "rgba(255, 255, 255, 0.3)",
  },
];

const defaultColors = [
  "#3E83FF",
  "#28DC8E",
  "#7400B8",
  "#FFDB01",
  "#FF9C0E",
  "#E03616",
  "#FFA0FD",
  "#B6B8D6",
  "#74FF00",
  "#FF6E00",
  "#A38CE3",
  "#FF1E1E",
  "#FFAA00",
  "#FF6E03",
  "#EE86C4",
  "#C881E4",
  "#FF0087",
  "#BC85E7",
  "#FFAEEC",
  "#FF1E3D",
  "#FFAEEC",
  "#FF008C",
  "#EF98CA",
  "#FEBDD3",
  "#FFD800",
  "#FF00D8",
  "#FF70B3",
  "#C28EE3",
  "#FF00B3",
  "#EE92D4",
  "#FF36B0",
  "#5D7DE8",
  "#FFA0FD",
  "#FF00A7",
  "#FF0080",
  "#FF008B",
  "#FF001E",
  "#B083F1",
  "#FF00A6",
  "#FF00AB",
  "#FF00A7",
  "#FF1E2C",
  "#FF00BF",
  "#FF00A3",
  "#FF006E",
  "#FFD800",
  "#FF00AB",
  "#FF00A4",
  "#FF1E49",
  "#FF00C2",
  "#FF008E",
  "#FEBED0",
  "#FF70B3",
  "#FF00B3",
  "#FF00A6",
  "#FF6E03",
  "#FF00A4",
  "#FF00D8",
  "#FF0080",
  "#FF008B",
  "#FFA4F3",
  "#FF00C2",
  "#FF00A6",
  "#FF1E1E",
  "#FF00AB",
  "#FF1E3D",
  "#FF1E1E",
  "#FF00BF",
  "#FF00D8",
  "#FFA0FD",
  "#FF006E",
  "#FF1E49",
  "#FF70B3",
  "#FFAEEC",
  "#EE92D4",
  "#FF008C",
  "#FF00BF",
  "#FF00AB",
  "#FFA4F3",
  "#FF00A7",
  "#EE86C4",
  "#FFD800",
  "#FF0080",
  "#FF008E",
  "#FF0087",
  "#FDB9CE",
  "#BC85E7",
  "#74FF00",
  "#FEBED0",
  "#FF1E2C",
  "#FF6E00",
  "#FFAA00",
  "#FFEB00",
  "#74FF00",
  "#2CFF00",
  "#00FF49",
  "#00FFA7",
  "#00FFEF",
  "#00BCFF",
  "#0074FF",
  "#002CFF",
  "#4900FF",
  "#A700FF",
  "#EF00FF",
  "#FF00D8",
  "#FF006E",
  "#FF001E",
  "#FF6400",
]; //, "#E03616", "#FFA0FD", "#B6B8D6"
const coeficientes = [0.2, 0.4, 0.6, 0.8];

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const InsightsColors = coeficientes.reduce(
  (prev) => {
    const arr = defaultColors.map((e) => rgbToHex(e));
    return [...prev, ...arr];
  },
  [...defaultColors],
);

export const useRandomColor = () => {
  const insightsColors = useMemo(
    () =>
      coeficientes.reduce(
        (prev, coe) => {
          const arr = defaultColors.map((e) => darken(e, coe));
          return [...prev, ...arr];
        },
        [...shuffleArray(defaultColors)],
      ),
    [],
  );

  const pattern = useMemo(() => shuffleArray(FillTypes), []);
  const patternSelector = useMemo(() => shuffleArray([0, 1, 2, 4, 8]), []);
  const randomPattern = useMemo(
    () => [
      {
        match: (d: any) => d.arc.index % 5 === patternSelector[0],
        id: pattern[0],
      },
      {
        match: (d: any) => d.arc.index % 5 === patternSelector[1],
        id: pattern[1],
      },
      {
        match: (d: any) => d.arc.index % 5 === patternSelector[2],
        id: pattern[2],
      },
    ],
    [pattern, patternSelector],
  );

  return {
    insightsColors,
    pattern,
    patternSelector,
    randomPattern,
  };
};

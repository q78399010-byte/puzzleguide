export type SolverPreview = {
  id: string;
  boardType:
    | "block-blast"
    | "screw-jam"
    | "goods-sort"
    | "water-sort"
    | "bus-escape"
    | "hexa-sort";
  solverName: string;
  gameName: string;
  boardRows: string[][];
  highlightCells: Array<[number, number]>;
  animationLabel: string;
  featurePills: string[];
  bestMove: string;
  comboChance: string;
  dangerLevel: string;
  nextStrategy: string;
};

export const solverMatrixPreviews: SolverPreview[] = [
  {
    id: "block-blast",
    boardType: "block-blast",
    solverName: "Block Blast Solver Preview",
    gameName: "Block Blast",
    boardRows: [
      ["", "B1", "B1", ""],
      ["C2", "C2", "", ""],
      ["", "", "D3", "D3"],
      ["E4", "", "", "E4"]
    ],
    highlightCells: [
      [0, 0],
      [1, 2],
      [1, 3]
    ],
    animationLabel: "Suggested placement",
    featurePills: ["Grid strategy", "Combo planning", "Space control"],
    bestMove: "Clear center first",
    comboChance: "72%",
    dangerLevel: "Low",
    nextStrategy: "Create space in the center"
  },
  {
    id: "screw-jam",
    boardType: "screw-jam",
    solverName: "Screw Jam Solver Preview",
    gameName: "Screw Jam",
    boardRows: [
      ["R1", "", "B2", "Y3"],
      ["R1", "G4", "B2", ""],
      ["", "G4", "P5", "P5"],
      ["Y3", "", "", "K6"]
    ],
    highlightCells: [
      [0, 0],
      [1, 0]
    ],
    animationLabel: "Remove blocker first",
    featurePills: ["Screw order", "Tray planning", "Blocker removal"],
    bestMove: "Remove blocker first",
    comboChance: "68%",
    dangerLevel: "Medium",
    nextStrategy: "Hold one empty tray"
  },
  {
    id: "goods-sort",
    boardType: "goods-sort",
    solverName: "Goods Sort Solver Preview",
    gameName: "Goods Sort",
    boardRows: [
      ["A", "A", "", "C"],
      ["B", "", "C", "C"],
      ["B", "D", "D", ""],
      ["", "A", "B", "D"]
    ],
    highlightCells: [
      [0, 3],
      [1, 2],
      [1, 3]
    ],
    animationLabel: "Group matching items",
    featurePills: ["Shelf grouping", "Item matching", "Route planning"],
    bestMove: "Group matching items",
    comboChance: "74%",
    dangerLevel: "Low",
    nextStrategy: "Group A items"
  },
  {
    id: "water-sort",
    boardType: "water-sort",
    solverName: "Water Sort Solver Preview",
    gameName: "Water Sort",
    boardRows: [
      ["R", "B", "G", ""],
      ["R", "B", "G", ""],
      ["Y", "R", "", "P"],
      ["Y", "B", "P", "G"]
    ],
    highlightCells: [
      [0, 3],
      [1, 3]
    ],
    animationLabel: "Keep one bottle empty",
    featurePills: ["Bottle space", "Color grouping", "Safe pours"],
    bestMove: "Keep one bottle empty",
    comboChance: "61%",
    dangerLevel: "Medium",
    nextStrategy: "Build red stack"
  },
  {
    id: "bus-escape",
    boardType: "bus-escape",
    solverName: "Bus Escape Solver Preview",
    gameName: "Bus Escape",
    boardRows: [
      ["N", "N", "", "E"],
      ["W", "B", "B", "E"],
      ["W", "", "S", "S"],
      ["", "G", "G", "X"]
    ],
    highlightCells: [
      [0, 2],
      [1, 2],
      [1, 3],
      [3, 3]
    ],
    animationLabel: "Clear exit lane",
    featurePills: ["Exit route", "Lane clearing", "Vehicle order"],
    bestMove: "Clear exit lane",
    comboChance: "57%",
    dangerLevel: "High",
    nextStrategy: "Free center lane"
  },
  {
    id: "hexa-sort",
    boardType: "hexa-sort",
    solverName: "Hexa Sort Solver Preview",
    gameName: "Hexa Sort",
    boardRows: [
      ["H1", "", "H2", "H2"],
      ["H3", "H1", "", "H4"],
      ["", "H3", "H4", ""],
      ["H5", "H5", "H1", "H4"]
    ],
    highlightCells: [
      [0, 0],
      [1, 1],
      [3, 2]
    ],
    animationLabel: "Match adjacent colors",
    featurePills: ["Color matching", "Adjacent planning", "Chain moves"],
    bestMove: "Match adjacent colors",
    comboChance: "66%",
    dangerLevel: "Medium",
    nextStrategy: "Anchor center"
  }
];

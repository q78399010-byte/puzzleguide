export type SolverPreview = {
  solverName: string;
  gameName: string;
  boardRows: string[][];
  bestMove: string;
  comboChance: string;
  dangerLevel: string;
  nextStrategy: string;
};

export const solverMatrixPreviews: SolverPreview[] = [
  {
    solverName: "Block Blast Solver Preview",
    gameName: "Block Blast",
    boardRows: [
      ["", "B1", "B1", ""],
      ["C2", "C2", "", ""],
      ["", "", "D3", "D3"],
      ["E4", "", "", "E4"]
    ],
    bestMove: "Clear left side first",
    comboChance: "72%",
    dangerLevel: "Low",
    nextStrategy: "Create space in the center"
  },
  {
    solverName: "Screw Jam Solver Preview",
    gameName: "Screw Jam",
    boardRows: [
      ["R1", "", "B2", "Y3"],
      ["R1", "G4", "B2", ""],
      ["", "G4", "P5", "P5"],
      ["Y3", "", "", "K6"]
    ],
    bestMove: "Release R1 first",
    comboChance: "68%",
    dangerLevel: "Medium",
    nextStrategy: "Hold one empty tray"
  },
  {
    solverName: "Goods Sort Solver Preview",
    gameName: "Goods Sort",
    boardRows: [
      ["A", "A", "", "C"],
      ["B", "", "C", "C"],
      ["B", "D", "D", ""],
      ["", "A", "B", "D"]
    ],
    bestMove: "Clear shelf C",
    comboChance: "74%",
    dangerLevel: "Low",
    nextStrategy: "Group A items"
  },
  {
    solverName: "Water Sort Solver Preview",
    gameName: "Water Sort",
    boardRows: [
      ["R", "B", "G", ""],
      ["R", "B", "G", ""],
      ["Y", "R", "", "P"],
      ["Y", "B", "P", "G"]
    ],
    bestMove: "Pour red to tube 4",
    comboChance: "61%",
    dangerLevel: "Medium",
    nextStrategy: "Build red stack"
  },
  {
    solverName: "Bus Escape Solver Preview",
    gameName: "Bus Escape",
    boardRows: [
      ["N", "N", "", "E"],
      ["W", "B", "B", "E"],
      ["W", "", "S", "S"],
      ["", "G", "G", "X"]
    ],
    bestMove: "Slide bus E down",
    comboChance: "57%",
    dangerLevel: "High",
    nextStrategy: "Free center lane"
  },
  {
    solverName: "Hexa Sort Solver Preview",
    gameName: "Hexa Sort",
    boardRows: [
      ["H1", "", "H2", "H2"],
      ["H3", "H1", "", "H4"],
      ["", "H3", "H4", ""],
      ["H5", "H5", "H1", "H4"]
    ],
    bestMove: "Merge H1 stack",
    comboChance: "66%",
    dangerLevel: "Medium",
    nextStrategy: "Anchor center"
  }
];

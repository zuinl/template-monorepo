export type House = {
  id: number;
  block: string;
  plot: string;
  totalResidents: number;
  status: HouseStatus;
};

export type HouseStatus = "IN_CONSTRUCTION" | "OCCUPIED" | "EMPTY";

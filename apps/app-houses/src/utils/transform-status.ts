import { HouseStatus } from "../types/house";

export const transformStatus = (status: HouseStatus): string => {
  if (status === "EMPTY") return "Lote vazio";
  if (status === "IN_CONSTRUCTION") return "Em construção";
  if (status === "OCCUPIED") return "Ocupado";

  return status;
};

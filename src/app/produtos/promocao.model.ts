export interface PromocaoModel {
  id: string;
  nome?: string;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
  deletadoEm: Date | string | null;
  leveX: number | null;
  pagueY: number | null;
  compreX: number | null;
  porY: number | null;
}

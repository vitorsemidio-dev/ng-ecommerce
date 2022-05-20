import { PromocaoModel } from './promocao.model';
export interface ProdutoModel {
  id: string;
  criadoEm: Date | string;
  atualizadoEm: Date | string;
  deletadoEm: Date | string | null;
  nome: string;
  preco: number;
  promocao: PromocaoModel | null;
}

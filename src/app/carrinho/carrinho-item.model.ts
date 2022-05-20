import { ProdutoModel } from '../produtos/produto.model';

export interface CarrinhoItemModel extends ProdutoModel {
  quantidade: number;
}

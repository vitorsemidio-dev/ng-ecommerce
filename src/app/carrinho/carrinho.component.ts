import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from '../produtos/produto.model';
import { produtosMock } from '../produtos/produtos.mock';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carrinho: ProdutoModel[] = produtosMock;

  constructor() {}

  ngOnInit(): void {}
}

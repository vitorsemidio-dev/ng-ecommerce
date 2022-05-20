import { ProdutoModel } from './produto.model';
import { Component, OnInit } from '@angular/core';
import { produtosMock } from './produtos.mock';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.produtos = produtosMock;
  }
}

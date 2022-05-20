import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../produtos/produto.model';
import { CarrinhoItemModel } from './carrinho-item.model';
import { CarrinhoService } from './carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carrinho$!: Observable<CarrinhoItemModel[]>;

  constructor(private readonly carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadCarrinho();
  }

  loadCarrinho() {
    this.carrinho$ = this.carrinhoService.getCarrinho();
  }

  handleIncrementItem(item: CarrinhoItemModel | ProdutoModel) {
    this.carrinhoService.incrementItem(item);
  }

  handleDecrementItem(item: CarrinhoItemModel | ProdutoModel) {
    this.carrinhoService.decrementItem(item);
  }
}

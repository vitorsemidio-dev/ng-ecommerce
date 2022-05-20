import { ProdutoModel } from './../produtos/produto.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarrinhoItemModel } from './carrinho-item.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private readonly carrinho$ = new BehaviorSubject<CarrinhoItemModel[]>([]);
  constructor() {}

  getCarrinho() {
    return this.carrinho$.asObservable();
  }

  addItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho[index].quantidade++;
    } else {
      carrinho.push({ ...item, quantidade: 1 });
    }
    this.carrinho$.next(carrinho);
  }

  removeItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho[index].quantidade--;
      if (carrinho[index].quantidade === 0) {
        carrinho.splice(index, 1);
      }
    }
    this.carrinho$.next(carrinho);
  }
}

import { ProdutoModel } from './../produtos/produto.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarrinhoItemModel } from './carrinho-item.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private readonly carrinho$ = new BehaviorSubject<CarrinhoItemModel[]>([]);
  private readonly key = '@siteware:carrinho';
  constructor() {
    const carrinho = localStorage.getItem(this.key);
    if (carrinho) {
      this.carrinho$.next(JSON.parse(carrinho));
    }
  }

  getCarrinho() {
    return this.carrinho$.asObservable();
  }

  incrementItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho[index].quantidade++;
    } else {
      carrinho.push({ ...item, quantidade: 1 });
    }
    this.carrinho$.next(carrinho);
    localStorage.setItem(this.key, JSON.stringify(carrinho));
  }

  decrementItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho[index].quantidade--;
      if (carrinho[index].quantidade === 0) {
        carrinho.splice(index, 1);
      }
    }
    this.carrinho$.next(carrinho);
    localStorage.setItem(this.key, JSON.stringify(carrinho));
  }

  removeItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho.splice(index, 1);
    }
    this.carrinho$.next(carrinho);
    localStorage.setItem(this.key, JSON.stringify(carrinho));
  }
}

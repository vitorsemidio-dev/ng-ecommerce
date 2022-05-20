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
      carrinho[index].precoSubTotal = this.helperCalculatePriceWithPromotion(
        carrinho[index]
      );
    } else {
      const carrinhoItem = {
        ...item,
        quantidade: 1,
      };
      const precoSubTotal =
        this.helperCalculatePriceWithPromotion(carrinhoItem);
      carrinho.push({ ...carrinhoItem, precoSubTotal });
    }
    this.carrinho$.next(carrinho);
    localStorage.setItem(this.key, JSON.stringify(carrinho));
  }

  decrementItem(item: CarrinhoItemModel | ProdutoModel) {
    const carrinho = this.carrinho$.getValue();
    const index = carrinho.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      carrinho[index].quantidade--;
      carrinho[index].precoSubTotal = this.helperCalculatePriceWithPromotion(
        carrinho[index]
      );
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

  helperCalculatePriceWithPromotion(item: CarrinhoItemModel) {
    const { preco, promocao } = item;
    if (!promocao) {
      return this.calculatePrecoWithoutPromocao(item);
    }
    const { leveX, pagueY } = promocao;
    if (leveX && pagueY) {
      return this.calculatePrecoWithPromotionLeveXPagueY(item);
    }
    const { compreX, porY } = promocao;
    if (compreX && porY) {
      return this.calculatePrecoWithPromotionCompreXPorY(item);
    }
    return preco;
  }

  calculatePrecoWithoutPromocao(item: CarrinhoItemModel) {
    const { preco, quantidade } = item;
    return preco * quantidade;
  }

  calculatePrecoWithPromotionLeveXPagueY(item: CarrinhoItemModel) {
    const { preco, quantidade, promocao } = item;
    if (!promocao) return -1;
    const { leveX, pagueY } = promocao;
    if (!leveX || !pagueY) return -1;

    const result1 = Math.trunc(quantidade / leveX) * pagueY;
    const result2 = quantidade % leveX;
    const totalToPay = (result1 + result2) * preco;
    return totalToPay;
  }
  calculatePrecoWithPromotionCompreXPorY(item: CarrinhoItemModel) {
    const { preco, quantidade, promocao } = item;
    if (!promocao) return -1;
    const { compreX, porY } = promocao;
    if (!compreX || !porY) return -1;

    const result1 = Math.trunc(quantidade / compreX) * porY;
    const result2 = (quantidade % compreX) * preco;
    const totalToPay = result1 + result2;
    return totalToPay;
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../produtos/produto.model';
import { CarrinhoItemModel } from './carrinho-item.model';
import { CarrinhoService } from './carrinho.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carrinho$!: Observable<CarrinhoItemModel[]>;
  precoTotalCarrinho: number = 0;
  displayedColumns: string[] = [
    'item',
    'quantidade',
    'preco',
    'promocao',
    'acao',
  ];
  dataSource = new MatTableDataSource<CarrinhoItemModel>([]);

  constructor(private readonly carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadCarrinho();
  }

  loadCarrinho() {
    this.carrinho$ = this.carrinhoService.getCarrinho();

    this.carrinho$.subscribe((carrinho) => {
      this.dataSource = new MatTableDataSource<CarrinhoItemModel>(carrinho);
      this.precoTotalCarrinho = this._calculateTotalPrecoCarrinho(carrinho);
    });
  }

  handleIncrementItem(item: CarrinhoItemModel | ProdutoModel) {
    this.carrinhoService.incrementItem(item);
  }

  handleDecrementItem(item: CarrinhoItemModel | ProdutoModel) {
    this.carrinhoService.decrementItem(item);
  }

  handleRemoveItem(item: CarrinhoItemModel | ProdutoModel) {
    this.carrinhoService.removeItem(item);
  }

  private _calculateTotalPrecoCarrinho(carrinho: CarrinhoItemModel[]) {
    let total = carrinho.reduce(
      (acc, curr) => acc + (curr.precoSubTotal || 0),
      0
    );
    return total;
  }
}

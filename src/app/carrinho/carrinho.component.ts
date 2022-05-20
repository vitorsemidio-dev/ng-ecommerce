import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../produtos/produto.model';
import { CarrinhoItemModel } from './carrinho-item.model';
import { CarrinhoService } from './carrinho.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnInit {
  carrinho$!: Observable<CarrinhoItemModel[]>;
  showTableLegacy = false;

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

  // Example

  displayedColumns: string[] = [
    'item',
    'quantidade',
    'preco',
    'promocao',
    // 'weight',
    // 'symbol',
  ];
  dataSource = new MatTableDataSource<CarrinhoItemModel>([]);
  selection = new SelectionModel<CarrinhoItemModel>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CarrinhoItemModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.nome + 1
    }`;
  }
}

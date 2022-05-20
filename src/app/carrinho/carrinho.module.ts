import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CarrinhoRoutingModule } from './carrinho-routing.module';
import { CarrinhoComponent } from './carrinho.component';

@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    CarrinhoRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class CarrinhoModule {}

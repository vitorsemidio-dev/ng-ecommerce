import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [ProdutosComponent],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
  ],
})
export class ProdutosModule {}

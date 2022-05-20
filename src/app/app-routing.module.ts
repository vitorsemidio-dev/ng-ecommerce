import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./produtos/produtos.module').then((m) => m.ProdutosModule),
  },
  {
    path: 'carrinho',
    loadChildren: () =>
      import('./carrinho/carrinho.module').then((m) => m.CarrinhoModule),
  },
  {
    path: '**',
    redirectTo: 'produtos', // todo: 404
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './poc-input/poc-input.component';
import { ProdutoModel } from './produto.model';
import { produtosMock } from './produtos.mock';
import { promocoesMock } from './promocao.mock';
import { PromocaoModel } from './promocao.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoModel[] = [];
  promocoes: PromocaoModel[] = [];

  produtoForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    preco: [0, [Validators.required, Validators.min(1)]],
    promocao: this.fb.group({
      id: [null],
    }),
  });

  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.produtos = produtosMock;
    this.promocoes = promocoesMock;
  }

  openDialog() {
    // TODO: open dialog
  }

  onSubmit() {
    console.log(this.produtoForm.value);
  }

  extractFieldValue(obj: any, field: string) {
    if (!obj) return;
    return obj[field];
  }
}

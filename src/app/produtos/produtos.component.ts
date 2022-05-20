import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from './poc-input/poc-input.component';
import { ProdutoModel } from './produto.model';
import { ProdutoService } from './produto.service';
import { produtosMock } from './produtos.mock';
import { promocoesMock } from './promocao.mock';
import { PromocaoModel } from './promocao.model';
import { PromocaoService } from './promocao.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtos: ProdutoModel[] = [];
  promocoes: PromocaoModel[] = [];

  produtos$!: Observable<ProdutoModel[]>;
  promocoes$!: Observable<PromocaoModel[]>;

  produtoForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    preco: [null, [Validators.required, Validators.min(1)]],
    promocao: this.fb.group({
      id: [null],
    }),
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private promocaoService: PromocaoService
  ) {}

  ngOnInit(): void {
    this.produtos = produtosMock;
    this.promocoes = promocoesMock;
    this.loadData();
  }

  loadData() {
    this.produtos$ = this.produtoService.get();
    this.produtos$.subscribe((produtos) => {
      console.log(produtos);
    });
    this.promocoes$ = this.promocaoService.get();
  }

  openForm() {}

  onSubmit() {
    console.log(this.produtoForm.value);
  }

  extractFieldValue(obj: any, field: string) {
    if (!obj) return;
    return obj[field];
  }
}

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
    id: [null],
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
    this.loadProdutos();
    this.loadPromocoes();
  }

  loadProdutos() {
    this.produtos$ = this.produtoService.get();
  }

  loadPromocoes() {
    this.promocoes$ = this.promocaoService.get();
  }

  openForm() {}

  onSubmit() {
    this._save();
  }

  private _save() {
    const produtoForm = this.produtoForm.value;
    this.produtoService.save(produtoForm).subscribe({
      next: (produto) => {
        console.log(produto);
        this.loadProdutos();
        this.produtoForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completo');
      },
    });
  }

  handleEdit(produtoTarget: ProdutoModel) {
    this._fillForm(produtoTarget);
  }

  handleDelete(produtoTarget: ProdutoModel) {
    this.produtoService.delete(produtoTarget.id).subscribe({
      next: (produto) => {
        console.log(produto);
        this.loadProdutos();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completo');
      },
    });
  }

  private _fillForm(produto: ProdutoModel) {
    this.produtoForm.patchValue({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      promocao: {
        id: produto.promocao?.id,
      },
    });
  }

  extractFieldValue(obj: any, field: string) {
    if (!obj) return;
    return obj[field];
  }
}

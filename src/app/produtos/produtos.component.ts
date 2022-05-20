import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoModel } from './produto.model';
import { ProdutoService } from './produto.service';
import { PromocaoModel } from './promocao.model';
import { PromocaoService } from './promocao.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  promocoes: PromocaoModel[] = [];

  produtos$!: Observable<ProdutoModel[]>;
  promocoes$!: Observable<PromocaoModel[]>;
  carrinho$!: Observable<any>;

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
    private promocaoService: PromocaoService,
    private carrinhoService: CarrinhoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadData() {
    this.loadProdutos();
    this.loadPromocoes();
    this.loadCarrinho();
  }

  loadProdutos() {
    this.produtos$ = this.produtoService.get();
  }

  loadPromocoes() {
    this.promocoes$ = this.promocaoService.get();
    this.promocaoService.get().subscribe((promocoes) => {
      this.promocoes = promocoes;
    });
  }

  loadCarrinho() {
    const sub = this.carrinhoService
      .getCarrinho()
      .subscribe((carrinhoAtual) => {
        console.log(carrinhoAtual);
      });
    this.subscriptions.push(sub);
  }

  onSubmit() {
    this._save();
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

  handleAddProduto(produtoTarget: ProdutoModel) {
    this.carrinhoService.incrementItem(produtoTarget);
  }

  extractFieldValue(obj: any, field: string) {
    if (!obj) return;
    return obj[field];
  }

  openDialog(produto?: ProdutoModel): void {
    const dialogRef = this.dialog.open(ProdutoFormComponent, {
      width: '450px',
      data: { promocoes: this.promocoes, produtoForm: produto },
    });

    dialogRef.afterClosed().subscribe((shouldRefresh) => {
      if (shouldRefresh) {
        this.loadProdutos();
      }
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
}

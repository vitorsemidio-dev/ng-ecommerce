import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from '../produto.service';
import { MyErrorStateMatcher } from '../produtos.component';
import { PromocaoModel } from '../promocao.model';
import { ProdutoModel } from './../produto.model';

export interface DialogData {
  produtoForm: ProdutoModel;
  promocoes: PromocaoModel[];
}

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss'],
})
export class ProdutoFormComponent {
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
    public dialogRef: MatDialogRef<ProdutoFormComponent>,
    private readonly fb: FormBuilder,
    private readonly produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    const { produtoForm } = this.data;
    if (produtoForm) {
      this.produtoForm.patchValue(produtoForm);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this._save();
  }

  private _save() {
    const produtoForm = this.produtoForm.value;
    this.produtoService.save(produtoForm).subscribe({
      next: (produto) => {
        console.log(produto);
        this.onNoClick();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completo');
      },
    });
  }

  extractFieldValue(obj: any, field: string) {
    if (!obj) return;
    return obj[field];
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProdutoModel } from './produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  baseUrl!: string;
  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  get() {
    return this.httpClient.get<ProdutoModel[]>(`${this.baseUrl}/produtos`);
  }

  getById(id: string) {
    return this.httpClient.get<ProdutoModel>(`${this.baseUrl}/produtos/${id}`);
  }

  create(produtoData: Omit<ProdutoModel, 'id'>) {
    return this.httpClient.post<ProdutoModel>(
      `${this.baseUrl}/produtos`,
      produtoData
    );
  }

  update(produtoData: ProdutoModel) {
    return this.httpClient.patch<ProdutoModel>(
      `${this.baseUrl}/produtos/${produtoData.id}`,
      produtoData
    );
  }

  delete(id: string) {
    return this.httpClient.delete<ProdutoModel>(
      `${this.baseUrl}/produtos/${id}`
    );
  }

  save(produtoData: ProdutoModel) {
    const { id, ...restData } = produtoData;
    if (id) {
      return this.update(produtoData);
    } else {
      return this.create(restData);
    }
  }
}

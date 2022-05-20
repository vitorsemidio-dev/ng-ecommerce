import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PromocaoModel } from './promocao.model';

@Injectable({
  providedIn: 'root',
})
export class PromocaoService {
  baseUrl!: string;
  resource: string = 'promocoes';
  constructor(private readonly httpClient: HttpClient) {
    this.baseUrl = environment.apiBaseUrl;
  }

  get() {
    return this.httpClient.get<PromocaoModel[]>(
      `${this.baseUrl}/${this.resource}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<PromocaoModel>(
      `${this.baseUrl}/${this.resource}/${id}`
    );
  }

  create(produtoData: PromocaoModel) {
    return this.httpClient.post<PromocaoModel>(
      `${this.baseUrl}/${this.resource}`,
      produtoData
    );
  }

  update(produtoData: PromocaoModel) {
    return this.httpClient.patch<PromocaoModel>(
      `${this.baseUrl}/${this.resource}/${produtoData.id}`,
      produtoData
    );
  }

  delete(id: string) {
    return this.httpClient.delete<PromocaoModel>(
      `${this.baseUrl}/${this.resource}/${id}`
    );
  }
}

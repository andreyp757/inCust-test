import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../store/main.store';

@Injectable({ providedIn: 'root' })

export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  fetchProducts() {
    return this.httpClient.get<Product[]>('./assets/data.json');
  }

}

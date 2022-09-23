import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  fetchProducts() {
    return this.httpClient.get<any[]>('./assets/data.json');
  }

}

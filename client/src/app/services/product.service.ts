import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // ตัวแปรสำหรับเก็บ URL ของ API
  private apiURL = environment.baseURLAPI;

  // Headers
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private http = inject(HttpClient);

  // Get All Products
  getAllProducts() {
    return this.http.get(this.apiURL + 'products', this.httpOptions);
  }
}

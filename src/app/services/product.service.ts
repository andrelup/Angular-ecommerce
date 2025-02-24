import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductDetail } from '../models/product-detail';
// import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private URI = 'https://itx-frontend-test.onrender.com';
    private http = inject(HttpClient);

    getProducts(): Observable<Product[]> {
        const urlProducts = new URL(this.URI+'/api/product');
        return this.http.get<Product[]>(urlProducts.toString());
    }
    getProduct(id: string): Observable<ProductDetail> {
        const urlProduct = new URL(this.URI+'/api/product/'+id);
        return this.http.get<ProductDetail>(urlProduct.toString());
    }
    addToCart(product: {id:string, colorCode: string, storageCode: string}): Observable<any> {
        const urlAddToCart = new URL(this.URI+'/api/cart');
        const body = {
            id: product.id,
            colorCode: product.colorCode,
            storageCode: product.storageCode};
        return this.http.post(urlAddToCart.toString(), body);
    }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0); // Estado Reactivo
  cartItemCount$ = this.cartItemCount.asObservable(); // Observable para suscribirse

  updateCartCount(count: number) {
    this.cartItemCount.next(count); // Actualizar la cantidad de items en la cesta
  }
}

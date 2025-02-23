import { Component, inject, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  imports: [ MatToolbarModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  private cartService = inject(CartService);
  cartItemCount: number = 0;

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      console.log(count);
      this.cartItemCount = count;
    });
  }
}

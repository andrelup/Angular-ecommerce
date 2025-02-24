import { Component, inject, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { CartService } from '../../services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [ MatToolbarModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  private router = inject(Router);
  private cartService = inject(CartService);

  cartItemCount = 0;
  onDetailPage = false;

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      console.log(count);
      this.cartItemCount = count;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.url;
        console.log('URL Cambiada:', currentUrl);
        if(currentUrl.includes('detail')) {
          this.onDetailPage = true;
        } else {
          this.onDetailPage = false;
        }
      });
  }
}

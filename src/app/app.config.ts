import { Config } from './../../node_modules/cosmiconfig/dist/types.d';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';


import { routes } from './app.routes';
import { productReducer } from './store/reducers/product.reducer';
import { ProductEffects } from './store/effects/product.effects';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './config/custom-paginator-intl';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ products: productReducer }),
    provideEffects([ProductEffects]),
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
};

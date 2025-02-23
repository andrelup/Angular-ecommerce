import { Config } from './../../node_modules/cosmiconfig/dist/types.d';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';

import { routes } from './app.routes';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';
import { CustomPaginatorIntl } from './config/custom-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ products: productReducer }),
    provideEffects([ProductEffects]),
    importProvidersFrom(MatChipsModule),
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ]
};

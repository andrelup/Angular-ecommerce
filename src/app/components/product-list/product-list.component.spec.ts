import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  // Estado inicial simulado del Store
  const initialState = {
    products: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatIconModule, MatButtonModule], // Agregamos los módulos necesarios
      providers: [
        provideHttpClient(),  //  Proveer HttpClient
        provideMockStore({ initialState }) // Proveer MockStore de NgRx
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('1️ debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});

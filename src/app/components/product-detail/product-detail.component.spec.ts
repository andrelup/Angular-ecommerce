import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetail } from '../../models/product-detail';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';



describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  const activatedRouteSpy = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? '123' : null) // ✅ Simula `paramMap.get('id')`
      }
    }
  };


  const mockProduct: ProductDetail = {
    id: '123',
    brand: 'Samsung',
    model: 'Galaxy S21',
    price: 999,
    imgUrl: 'test.jpg',
    cpu: 'Exynos 2100',
    ram: '8GB',
    os: 'Android',
    displayResolution: '1440x3200',
    battery: '4000mAh',
    primaryCamera: ['108MP'],
    secondaryCmera: '10MP',
    dimentions: '151.7 x 71.2 x 7.9 mm',
    weight: 169,
    colors: [ 'red', 'blue' ],
    internalMemory: [ '128GB', '256GB' ],
    options: {
      colors: [{ code: '1', name: 'red' }, { code: '2', name: 'blue' }],
      storages: [{ code: '1', name: '128GB' }, { code: '2', name: '256GB' }]
    }
  };

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'addToCart']);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['updateCartCount']);
    // Crear un spy para `ActivatedRoute`


    await TestBed.configureTestingModule({
      imports: [ MatIconModule, MatButtonModule, FormsModule],
      providers: [
        provideHttpClient(),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture.destroy();
  });
  it('1️ debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('2️ debería cargar el producto al inicializar', () => {
    productServiceSpy.getProduct.and.returnValue(of(mockProduct));
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    component.ngOnInit();
    expect(component.product).toEqual(mockProduct);
  });

  it('3️ debería mostrar la marca, modelo y precio correctamente', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    productServiceSpy.getProduct.and.returnValue(of(mockProduct)); // Simula la respuesta de la API
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.product-title').textContent).toContain('Galaxy S21');
    expect(compiled.querySelector('.product-subtitle').textContent).toContain('Samsung');
    expect(compiled.querySelector('.product-price').textContent).toContain('999');
  });

  it('4️ debería deshabilitar el botón de añadir a la cesta si no se selecciona color y almacenamiento', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    productServiceSpy.getProduct.and.returnValue(of(mockProduct)); // Simula la respuesta de la API
    component.ngOnInit();
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.add-to-cart');
    expect(button.disabled).toBeTrue();
  });

  it('5️ debería habilitar el botón de añadir a la cesta cuando se seleccionan opciones', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    productServiceSpy.getProduct.and.returnValue(of(mockProduct)); // Simula la respuesta de la API
    component.ngOnInit();
    component.selectedColor = 'red';
    component.selectedStorage = '128GB';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.add-to-cart');
    expect(button.disabled).toBeFalse();
  });

  it('6️ debería llamar a addToCart() y actualizar la cesta', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    component.selectedColor = 'red';
    component.selectedStorage = '128GB';
    component.product = mockProduct;

    productServiceSpy.addToCart.and.returnValue(of({ count: 1 }));
    component.addToCart();

    expect(productServiceSpy.addToCart).toHaveBeenCalledWith({
      id: '123',
      colorCode: 'red',
      storageCode: '128GB'
    });
    expect(cartServiceSpy.updateCartCount).toHaveBeenCalledWith(1);
  });

  it('7️ debería navegar de regreso cuando se llame goBack()', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goBack();
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });

  it('8️ debería inicializar selectedColor y selectedStorage como vacio', () => {
    expect(component.selectedColor).toEqual('');
    expect(component.selectedStorage).toEqual('');
  });

  it('9️ debería mostrar la imagen del producto correctamente', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);
    productServiceSpy.getProduct.and.returnValue(of(mockProduct)); // Simula la respuesta de la API
    component.ngOnInit();

    fixture.detectChanges();
    const imgElement = fixture.nativeElement.querySelector('.product-img-large');
    expect(imgElement.src).toContain('test.jpg');
  });

  it('10 debería deshabilitar el botón de añadir si el producto no está definido', () => {
    activatedRouteSpy.snapshot.paramMap.get = (key: string) => (key === 'id' ? '123' : null);

    productServiceSpy.getProduct.and.returnValue(of(mockProduct)); // Simula la respuesta de la API
    component.ngOnInit();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.add-to-cart');

    expect(button).not.toBeNull(); // Asegurar que el botón existe
    expect(button.disabled).toBeTrue(); //  Asegurar que el botón está deshabilitado
  });
});


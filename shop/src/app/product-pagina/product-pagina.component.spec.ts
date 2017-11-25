import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginaComponent } from './product-pagina.component';

describe('ProductPaginaComponent', () => {
  let component: ProductPaginaComponent;
  let fixture: ComponentFixture<ProductPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

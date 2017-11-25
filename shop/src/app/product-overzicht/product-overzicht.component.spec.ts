import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOverzichtComponent } from './product-overzicht.component';

describe('ProductOverzichtComponent', () => {
  let component: ProductOverzichtComponent;
  let fixture: ComponentFixture<ProductOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

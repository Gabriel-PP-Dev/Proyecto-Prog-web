import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrecioComponent } from './crear-precio.component';

describe('CrearPrecioComponent', () => {
  let component: CrearPrecioComponent;
  let fixture: ComponentFixture<CrearPrecioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearPrecioComponent]
    });
    fixture = TestBed.createComponent(CrearPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

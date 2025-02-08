import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverPrecioComponent } from './mover-precio.component';

describe('MoverPrecioComponent', () => {
  let component: MoverPrecioComponent;
  let fixture: ComponentFixture<MoverPrecioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoverPrecioComponent]
    });
    fixture = TestBed.createComponent(MoverPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

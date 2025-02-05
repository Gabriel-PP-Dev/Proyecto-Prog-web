import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatbarComponent } from './natbar.component';

describe('NatbarComponent', () => {
  let component: NatbarComponent;
  let fixture: ComponentFixture<NatbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NatbarComponent]
    });
    fixture = TestBed.createComponent(NatbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

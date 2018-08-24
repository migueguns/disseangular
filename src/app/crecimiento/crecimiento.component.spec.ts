import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecimientoComponent } from './crecimiento.component';

describe('CrecimientoComponent', () => {
  let component: CrecimientoComponent;
  let fixture: ComponentFixture<CrecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

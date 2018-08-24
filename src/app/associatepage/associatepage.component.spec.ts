import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatepageComponent } from './associatepage.component';

describe('AssociatepageComponent', () => {
  let component: AssociatepageComponent;
  let fixture: ComponentFixture<AssociatepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

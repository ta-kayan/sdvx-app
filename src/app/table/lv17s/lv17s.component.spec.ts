import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lv17sComponent } from './lv17s.component';

describe('Lv17sComponent', () => {
  let component: Lv17sComponent;
  let fixture: ComponentFixture<Lv17sComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lv17sComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lv17sComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

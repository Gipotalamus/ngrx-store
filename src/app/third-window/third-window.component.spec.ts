import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdWindowComponent } from './third-window.component';

describe('ThirdWindowComponent', () => {
  let component: ThirdWindowComponent;
  let fixture: ComponentFixture<ThirdWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

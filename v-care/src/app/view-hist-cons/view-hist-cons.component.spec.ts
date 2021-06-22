import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistConsComponent } from './view-hist-cons.component';

describe('ViewHistConsComponent', () => {
  let component: ViewHistConsComponent;
  let fixture: ComponentFixture<ViewHistConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistConsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

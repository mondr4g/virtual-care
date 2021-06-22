import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingConsComponent } from './waiting-cons.component';

describe('WaitingConsComponent', () => {
  let component: WaitingConsComponent;
  let fixture: ComponentFixture<WaitingConsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingConsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

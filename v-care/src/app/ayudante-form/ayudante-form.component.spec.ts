import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudanteFormComponent } from './ayudante-form.component';

describe('AyudanteFormComponent', () => {
  let component: AyudanteFormComponent;
  let fixture: ComponentFixture<AyudanteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyudanteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudanteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

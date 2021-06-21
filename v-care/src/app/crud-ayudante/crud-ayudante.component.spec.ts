import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAyudanteComponent } from './crud-ayudante.component';

describe('CrudAyudanteComponent', () => {
  let component: CrudAyudanteComponent;
  let fixture: ComponentFixture<CrudAyudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudAyudanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAyudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

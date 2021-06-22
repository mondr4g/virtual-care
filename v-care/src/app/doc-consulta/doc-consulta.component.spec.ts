import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConsultaComponent } from './doc-consulta.component';

describe('DocConsultaComponent', () => {
  let component: DocConsultaComponent;
  let fixture: ComponentFixture<DocConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

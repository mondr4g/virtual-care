import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDoctorComponent } from './crud-doctor.component';

describe('CrudDoctorComponent', () => {
  let component: CrudDoctorComponent;
  let fixture: ComponentFixture<CrudDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNurseComponent } from './crud-nurse.component';

describe('CrudNurseComponent', () => {
  let component: CrudNurseComponent;
  let fixture: ComponentFixture<CrudNurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudNurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

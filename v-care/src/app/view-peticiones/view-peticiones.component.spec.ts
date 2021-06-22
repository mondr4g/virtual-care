import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPeticionesComponent } from './view-peticiones.component';

describe('ViewPeticionesComponent', () => {
  let component: ViewPeticionesComponent;
  let fixture: ComponentFixture<ViewPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPeticionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

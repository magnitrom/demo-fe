import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaServiciosComponent } from './consulta-servicios.component';

describe('ConsultaServiciosComponent', () => {
  let component: ConsultaServiciosComponent;
  let fixture: ComponentFixture<ConsultaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaServiciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

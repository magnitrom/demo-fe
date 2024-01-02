import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinGraficoBarraVComponent } from './sefin-grafico-barra-v.component';

describe('SefinGraficoBarraVComponent', () => {
  let component: SefinGraficoBarraVComponent;
  let fixture: ComponentFixture<SefinGraficoBarraVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinGraficoBarraVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinGraficoBarraVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

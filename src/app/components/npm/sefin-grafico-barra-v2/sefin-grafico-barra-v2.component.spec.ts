import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinGraficoBarraV2Component } from './sefin-grafico-barra-v2.component';

describe('SefinGraficoBarraV2Component', () => {
  let component: SefinGraficoBarraV2Component;
  let fixture: ComponentFixture<SefinGraficoBarraV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinGraficoBarraV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinGraficoBarraV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

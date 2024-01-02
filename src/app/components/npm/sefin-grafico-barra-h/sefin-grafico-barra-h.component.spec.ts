import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinGraficoBarraHComponent } from './sefin-grafico-barra-h.component';

describe('SefinGraficoBarraHComponent', () => {
  let component: SefinGraficoBarraHComponent;
  let fixture: ComponentFixture<SefinGraficoBarraHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinGraficoBarraHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinGraficoBarraHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

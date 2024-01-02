import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinGraficoLinealComponent } from './sefin-grafico-lineal.component';

describe('SefinGraficoLinealComponent', () => {
  let component: SefinGraficoLinealComponent;
  let fixture: ComponentFixture<SefinGraficoLinealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinGraficoLinealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinGraficoLinealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

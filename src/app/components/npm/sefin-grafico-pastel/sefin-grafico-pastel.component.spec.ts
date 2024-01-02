import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinGraficoPastelComponent } from './sefin-grafico-pastel.component';

describe('SefinGraficoPastelComponent', () => {
  let component: SefinGraficoPastelComponent;
  let fixture: ComponentFixture<SefinGraficoPastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinGraficoPastelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinGraficoPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

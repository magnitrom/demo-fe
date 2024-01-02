import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionTgrPrevisualizacionComponent } from './creacion-tgr-previsualizacion.component';

describe('CreacionTgrPrevisualizacionComponent', () => {
  let component: CreacionTgrPrevisualizacionComponent;
  let fixture: ComponentFixture<CreacionTgrPrevisualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionTgrPrevisualizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionTgrPrevisualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

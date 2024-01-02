import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCambioClaveComponent } from './form-cambio-clave.component';

describe('FormCambioClaveComponent', () => {
  let component: FormCambioClaveComponent;
  let fixture: ComponentFixture<FormCambioClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCambioClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCambioClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

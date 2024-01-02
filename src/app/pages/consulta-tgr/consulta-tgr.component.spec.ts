import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTgrComponent } from './consulta-tgr.component';

describe('ConsultaTgrComponent', () => {
  let component: ConsultaTgrComponent;
  let fixture: ComponentFixture<ConsultaTgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaTgrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

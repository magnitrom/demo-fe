import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinInputComponent } from './sefin-input.component';

describe('SefinInputComponent', () => {
  let component: SefinInputComponent;
  let fixture: ComponentFixture<SefinInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinDatatableComponent } from './sefin-datatable.component';

describe('SefinDatatableComponent', () => {
  let component: SefinDatatableComponent;
  let fixture: ComponentFixture<SefinDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

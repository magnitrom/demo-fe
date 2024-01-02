import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinMenubarComponent } from './sefin-menubar.component';

describe('SefinMenubarComponent', () => {
  let component: SefinMenubarComponent;
  let fixture: ComponentFixture<SefinMenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinMenubarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

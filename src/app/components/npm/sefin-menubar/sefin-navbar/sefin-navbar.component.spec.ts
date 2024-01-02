import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinNavbarComponent } from './sefin-navbar.component';

describe('SefinNavbarComponent', () => {
  let component: SefinNavbarComponent;
  let fixture: ComponentFixture<SefinNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinSidenavComponent } from './sefin-sidenav.component';

describe('SefinSidenavComponent', () => {
  let component: SefinSidenavComponent;
  let fixture: ComponentFixture<SefinSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

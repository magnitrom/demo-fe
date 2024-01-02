import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinPreloaderComponent } from './sefin-preloader.component';

describe('SefinPreloaderComponent', () => {
  let component: SefinPreloaderComponent;
  let fixture: ComponentFixture<SefinPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinPreloaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

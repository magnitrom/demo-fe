import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinFaqsComponent } from './sefin-faqs.component';

describe('SefinFaqsComponent', () => {
  let component: SefinFaqsComponent;
  let fixture: ComponentFixture<SefinFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinFaqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

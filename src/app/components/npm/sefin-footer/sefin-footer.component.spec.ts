import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinFooterComponent } from './sefin-footer.component';

describe('SefinFooterComponent', () => {
  let component: SefinFooterComponent;
  let fixture: ComponentFixture<SefinFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinAvatarbarComponent } from './sefin-avatarbar.component';

describe('SefinAvatarbarComponent', () => {
  let component: SefinAvatarbarComponent;
  let fixture: ComponentFixture<SefinAvatarbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinAvatarbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinAvatarbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

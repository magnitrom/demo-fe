import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SefinChatComponent } from './sefin-chat.component';

describe('SefinChatComponent', () => {
  let component: SefinChatComponent;
  let fixture: ComponentFixture<SefinChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SefinChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SefinChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

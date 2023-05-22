import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PlayerAvatarComponent } from './player-avatar.component';

describe('PlayerAvatarComponent', () => {
  let component: PlayerAvatarComponent;
  let fixture: ComponentFixture<PlayerAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerAvatarComponent],
    });
    fixture = TestBed.createComponent(PlayerAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the player avatar and health bar', () => {
    expect(fixture.debugElement.query(By.css('.health-bar'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.player-avatar'))).toBeNull();

    component.player = {
      name: 'Player 1 (You)',
      type: 'player',
      health: 100,
      image: '../assets/images/ryu.png',
    };

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.health-bar'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.player-avatar'))).toBeTruthy();
  });
});

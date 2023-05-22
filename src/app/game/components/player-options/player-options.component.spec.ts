import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PlayerOptionsComponent } from './player-options.component';

describe('PlayerOptionsComponent', () => {
  let component: PlayerOptionsComponent;
  let fixture: ComponentFixture<PlayerOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerOptionsComponent],
    });
    fixture = TestBed.createComponent(PlayerOptionsComponent);
    component = fixture.componentInstance;
    component.playerType = 'player';
    component.options = ['ROCK', 'PAPER', 'SCISSOR'];
    component.isAbleToPlay = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event when the player makes a choice', () => {
    spyOn(component.setPlayerChoice, 'emit');

    const optionButton = fixture.debugElement.query(
      By.css('.player-option-btn')
    ).nativeElement;
    optionButton.click();
    fixture.detectChanges();

    expect(component.setPlayerChoice.emit).toHaveBeenCalledWith({
      type: component.playerType,
      value: optionButton.textContent.trim(),
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOptionsComponent } from './player-options.component';

describe('PlayerOptionsComponent', () => {
  let component: PlayerOptionsComponent;
  let fixture: ComponentFixture<PlayerOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerOptionsComponent]
    });
    fixture = TestBed.createComponent(PlayerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

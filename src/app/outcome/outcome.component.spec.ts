import { ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { OutcomeComponent } from './outcome.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WinnerService } from '../shared/services';
import { By } from '@angular/platform-browser';

describe('OutcomeComponent', () => {
  let component: OutcomeComponent;
  let fixture: ComponentFixture<OutcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinnerService],
      imports: [RouterTestingModule],
      declarations: [OutcomeComponent],
    });
    fixture = TestBed.createComponent(OutcomeComponent);
    component = fixture.componentInstance;
  });

  describe("when there's no winner", () => {
    it('navigates to Home page', inject([Router], async (router: Router) => {
      spyOn(router, 'navigate').and.stub();

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    }));
  });

  describe("when there's a winner", () => {
    it('displays the winner and a button to play again', inject(
      [Router, WinnerService],
      async (router: Router, winnerService: WinnerService) => {
        spyOn(router, 'navigate').and.stub();
        spyOn(winnerService, 'getWinner').and.returnValue('Player 1 (You)');

        fixture = TestBed.createComponent(OutcomeComponent);

        fixture.detectChanges();
        await fixture.whenStable();

        const element = fixture.debugElement.query(By.css('#winner'));

        expect(element.nativeElement.textContent).toContain(
          'PLAYER 1 (YOU) has won the game'
        );

        const button = fixture.debugElement.query(By.css('.game-btn'));

        button.nativeElement.click();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
      }
    ));
  });
});

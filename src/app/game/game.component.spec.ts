import {
  ComponentFixture,
  TestBed,
  inject,
  fakeAsync,
  tick,
  flush,
  waitForAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { GameComponent } from './game.component';
import { PlayerOptionsComponent, PlayerAvatarComponent } from './components';
import { GameService } from './services';
import { mockedResponses } from './mocked-responses';
import { WinnerService } from '../shared/services';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        PlayerAvatarComponent,
        PlayerOptionsComponent,
      ],
      imports: [HttpClientTestingModule],
      providers: [GameService, WinnerService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('game preparation', () => {
    describe('when responses are successful', () => {
      beforeEach(() => {
        const optionsRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/options'
        );
        const playersRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/players'
        );

        optionsRequest.flush({ data: { options: mockedResponses.options } });
        playersRequest.flush({ data: { players: mockedResponses.players } });
      });

      it('renders the player Avatar and health Bar', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const healthBars = fixture.debugElement.queryAll(By.css('.health-bar'));
        const avatars = fixture.debugElement.queryAll(By.css('.player-avatar'));
        expect(healthBars.length).toBe(2);
        expect(avatars.length).toBe(2);
        avatars.forEach((avatar) =>
          expect(avatar.attributes['src']?.match(/..\/assets/)).toBeTruthy()
        );
      });

      it('renders the player and computer Options', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const playerOptions = fixture.debugElement
          .query(By.css('#player-options-container'))
          .queryAll(By.css('.player-option-btn'));
        const computerOptions = fixture.debugElement
          .query(By.css('#computer-options-container'))
          .queryAll(By.css('.player-option-btn'));

        playerOptions.forEach((option) => {
          expect(
            mockedResponses.options.includes(option.nativeElement.textContent)
          );
          expect(option.classes['option-btn-disable']).toBeFalsy();
        });
        computerOptions.forEach((option) => {
          expect(
            mockedResponses.options.includes(option.nativeElement.textContent)
          );
          expect(option.classes['option-btn-disable']).toBeTruthy();
        });
      });
    });

    describe('when one or more responses are not successful', () => {
      beforeEach(() => {
        const error = new Error('Failed #GET /api/game/options');
        const optionsRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/options'
        );
        const playersRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/players'
        );
        optionsRequest.flush(null, new HttpErrorResponse({ error }));
        playersRequest.flush({ data: { players: mockedResponses.players } });
      });

      it('navigates back to the HomePage', inject(
        [Router],
        async (router: Router) => {
          spyOn(router, 'navigate').and.stub();

          fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/']);
          });
        }
      ));
    });
  });

  describe('game actions', () => {
    const getFightBtn = () =>
      fixture.debugElement
        .query(By.css('#submit-game-container'))
        .query(By.css('.game-btn'));

    beforeEach(() => {
      const optionsRequest = httpTestingController.expectOne(
        'http://localhost:8080/api/game/options'
      );
      const playersRequest = httpTestingController.expectOne(
        'http://localhost:8080/api/game/players'
      );
      optionsRequest.flush({ data: { options: mockedResponses.options } });
      playersRequest.flush({ data: { players: mockedResponses.players } });
    });

    describe('when the player chooses an option', () => {
      it('updates the choice for "player" and displays FIGHT button', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        expect(getFightBtn()).toBeNull();

        const optionBtn = fixture.debugElement
          .query(By.css('#player-options-container'))
          .query(By.css('.player-option-btn')).nativeElement;

        optionBtn.click();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(component.choices.playerChoice).toEqual('ROCK');
        expect(getFightBtn().nativeElement).toBeTruthy();
      });
    });

    describe('when the player submits its choice', () => {
      it('does not allow the player to change its choice and displays message', async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const optionBtns = fixture.debugElement
          .query(By.css('#player-options-container'))
          .queryAll(By.css('.player-option-btn'));

        // Click on Rock
        optionBtns[0].nativeElement.click();

        await fixture.whenStable();
        fixture.detectChanges();

        // Click on FIGHT
        getFightBtn().nativeElement.click();

        //Click on Paper
        optionBtns[1].nativeElement.click();

        await fixture.whenStable();
        fixture.detectChanges();

        httpTestingController
          .expectOne('http://localhost:8080/api/game/resolve')
          .flush({});

        fixture.detectChanges();

        const message = fixture.debugElement.query(
          By.css('#game-message')
        ).nativeElement;
        expect(component.isAbleToPlay).toEqual(false);
        expect(component.choices['playerChoice']).toEqual('ROCK');
        expect(message.textContent).toEqual('Attacking');
      });

      it('updates the game accordingly', fakeAsync(() => {
        component.choices.playerChoice = 'ROCK';
        component.submit();

        flush();

        const resolveRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/resolve'
        );
        resolveRequest.flush({
          data: mockedResponses.resolve,
        });

        tick(2000);

        expect(component.choices.computerChoice).toEqual('SCISSOR');
        expect(component.message).toMatch(/WIN:/);
        expect(component.players['player']['health']).toEqual(100);
        expect(component.players['computer']['health']).toEqual(75);

        flush();

        expect(component.message).toEqual('');
        flush();
      }));

      it('navigates to /outcome if game is over', fakeAsync(
        inject([Router], (router: Router) => {
          spyOn(router, 'navigate').and.stub();

          component.choices.playerChoice = 'ROCK';
          component.submit();

          flush();

          const resolveTurnRequest = httpTestingController.expectOne(
            'http://localhost:8080/api/game/resolve'
          );
          resolveTurnRequest.flush({
            data: mockedResponses.gameOver,
          });
          flush();

          fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['/outcome']);
          });
        })
      ));
    });
  });

  describe('resetting game', () => {
    beforeEach(() => {
      const optionsRequest = httpTestingController.expectOne(
        'http://localhost:8080/api/game/options'
      );
      const playersRequest = httpTestingController.expectOne(
        'http://localhost:8080/api/game/players'
      );
      optionsRequest.flush({ data: { options: mockedResponses.options } });
      playersRequest.flush({ data: { players: mockedResponses.players } });
    });

    it('navigates back to the HomePage and resets players health', inject(
      [Router],
      async (router: Router) => {
        spyOn(router, 'navigate').and.stub();

        const resetBtn = fixture.debugElement.query(
          By.css('#reset-btn')
        ).nativeElement;
        resetBtn.click();
        const resetRequest = httpTestingController.expectOne(
          'http://localhost:8080/api/game/reset'
        );

        resetRequest.flush({ data: { players: mockedResponses.players } });

        fixture.whenStable().then(() => {
          expect(router.navigate).toHaveBeenCalledWith(['/']);
        });
      }
    ));
  });
});

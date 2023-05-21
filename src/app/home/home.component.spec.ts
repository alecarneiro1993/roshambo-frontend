import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { fireEvent } from '@testing-library/angular';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page content', () => {
    it('should show a blinking text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2.blinking')?.textContent).toContain(
        'Press ENTER to start'
      );
    });
  });

  describe('when user presses ENTER', () => {
    it('navigates to Game page', inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();

      fireEvent.keyDown(
        fixture.debugElement.query(By.css('#prompt')).nativeElement,
        {
          key: 'Enter',
          code: 'Enter',
          charCode: 13,
        }
      );
      expect(router.navigate).toHaveBeenCalledWith(['game']);
    }));
  });
});

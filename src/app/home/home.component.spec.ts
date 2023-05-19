import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { fireEvent, screen } from '@testing-library/angular';

import { HomeComponent } from './home.component';

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

  fdescribe('navigation', () => {
    it('navigates to Game page when the user presses ENTER', inject(
      [Router],
      (router: Router) => {
        spyOn(router, 'navigate').and.stub();
        fireEvent.keyDown(screen.getByText(/ENTER/), {
          key: 'Enter',
          code: 'Enter',
          charCode: 13,
        });
        expect(router.navigate).toHaveBeenCalledWith(['game']);
      }
    ));
  });
});

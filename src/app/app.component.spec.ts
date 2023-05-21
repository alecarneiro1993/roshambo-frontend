import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    })
  );

  describe('page content', () => {
    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'roshambo-frontend'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('roshambo-frontend');
    });

    it('should render title and subtitle', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.game-title')?.textContent).toContain(
        'Roshambo'
      );
      expect(compiled.querySelector('.subtitle')?.textContent).toContain(
        'Street Fighter Edition'
      );
    });
  });
});

import { render, screen } from '@testing-library/angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  fdescribe('page content', () => {
    it('should render title and subtitle', async () => {
      await render(AppComponent, {});
      expect(screen.getByText('Roshambo'));
      expect(screen.getByText('Street Fighter Edition'));
    });
  });
});

import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { AppContextVariant } from '../AppContext';

describe('Tests for the AppContext component', () => {
  screen.debug();

  it('createsAppContext', async () => {
    const appContext = Object.assign(AppContextVariant);
    expect(appContext['_currentValue']).haveOwnProperty('searchString');
  });
});

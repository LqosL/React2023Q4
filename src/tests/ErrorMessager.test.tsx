import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessager from '../components/ErrorMessager';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorThrower from '../components/ErrorThrower';

describe('Error messager tests', async () => {
  screen.debug();
  it('ErrorMessage is rendered', async () => {
    render(<ErrorMessager />);
    await screen.findByRole('error_messager');
    const a = screen.getByRole('error_messager');
    expect(a).toHaveProperty('className');
    expect(a.getAttribute('class')).toBe('error');
  });

  it('ErrorMessage is not rendered', async () => {
    try {
      render(<ErrorThrower mustThrow={true} />);
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
      expect((e as Error).message).toBe(
        'OOPS! There is an error. Please, reload the page'
      );
    }
  });
});
describe('ErrorBoundary tests', async () => {
  screen.debug();
  it('ErrorMessage is rendered', async () => {
    const error = new Error();
    error.message = 'bad bad bad';
    expect(ErrorBoundary.getDerivedStateFromError(error)).toBeTruthy();
  });
});

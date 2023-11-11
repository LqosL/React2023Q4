import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound tests', async () => {
    screen.debug();
    it('Not found is rendered', async () => {
        render(<NotFound />);
        await screen.findByRole('NotFoundPage');
        const a = screen.getByRole('NotFoundPage');
        expect(a).toHaveProperty('className');
        expect(a.getAttribute('class')).toBe('not-found');
    });
});
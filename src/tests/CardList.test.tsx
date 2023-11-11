import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsSection from '../components/SectionResults';
import { AppContextVariant } from '../AppContext';
import { AppContext } from '../types/AppContext';

describe('CardList tests', async () => {
  screen.debug();
  it('Component renders the specified number of cards for empty list', async () => {
    render(
      <ResultsSection inLoadingNow={false} onItemSelected={() => Object} />
    );
    await screen.findByRole('EmptyList');
    const a = screen.getByRole('EmptyList');
    expect(a.children.length).toEqual(0);
    expect(a.innerHTML).toEqual('Nothing found yet');
  });

  const containerContext: AppContext = {
    searchString: 'hello',
    setSearch: () => {},
    results: [
      {
        title: 'aaa',
        author_name: 'aaa',
        first_publish_year: '1111',
        key: 'aaaa',
      },
      {
        title: 'bbb',
        author_name: 'bbb',
        first_publish_year: '2222',
        key: 'bbb',
      },
      {
        title: 'ccc',
        author_name: 'ccc',
        first_publish_year: '3333',
        key: 'ccc',
      },
      {
        title: 'ddd',
        author_name: 'ddd',
        first_publish_year: '4444',
        key: 'ddd',
      },
      {
        title: 'eee',
        author_name: 'eee',
        first_publish_year: '5555',
        key: 'eee',
      },
      {
        title: 'fff',
        author_name: 'fff',
        first_publish_year: '6666',
        key: 'fff',
      },
      {
        title: 'ggg',
        author_name: 'ggg',
        first_publish_year: '7777',
        key: 'ggg',
      },
    ],
    setResults: () => {},
  };

  it('Component renders the specified number of cards for results list', async () => {
    render(
      <AppContextVariant.Provider value={containerContext}>
        <ResultsSection inLoadingNow={false} onItemSelected={() => Object} />
      </AppContextVariant.Provider>
    );
    await screen.findByRole('ResultsList');
    const a = screen.getByRole('ResultsList');
    expect(a.children.length).toEqual(7);
  });
});

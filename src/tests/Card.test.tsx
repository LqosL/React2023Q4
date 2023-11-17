import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ResultsUnit } from '../components/ResultsUnit';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Card tests rendering', async () => {
  const fetchMocker = createFetchMock(vi);
  beforeAll(() => {
    fetchMocker.enableMocks();
  });
  screen.debug();
  const result = {
    title: 'aaa',
    author_name: 'aaa',
    first_publish_year: '1111',
    key: 'aaa',
  };
  it('Card component renders the relevant card data', async () => {
    let clickHappen = false;
    render(
      <Provider store={store}>
        <ResultsUnit
          title={result.title}
          key={result.key}
          first_publish_year={result.first_publish_year}
          author_name={result.author_name}
          onClick={() => {
            clickHappen = true;
          }}
        />
      </Provider>
    );
    await screen.findByRole('results_unit');
    const a = screen.getByRole('results_unit');
    expect(a.children[0].className).toEqual('info results_title');
    expect((a.children[0] as HTMLDivElement).innerHTML).toContain(result.title);
    expect(a.children[1].className).toEqual('info results_author');
    expect((a.children[1] as HTMLDivElement).innerHTML).toContain(
      result.author_name
    );
    expect(a.children[2].className).toEqual('info results_first-published');
    expect((a.children[2] as HTMLDivElement).innerHTML).toContain(
      result.first_publish_year
    );

    await userEvent.click(a);
    expect(clickHappen).toBeTruthy();
  });
  afterAll(() => {
    fetchMocker.dontMock();
  });
});

import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import React from 'react';
import { AppContext } from '../types/AppContext';
import userEvent from '@testing-library/user-event';
import createFetchMock from 'vitest-fetch-mock';
import { AppRouterConfig } from '../AppRouterConfig';
import { NewFakeLocalStorage } from './App.test';

const containerContext: AppContext = {
  searchString: 'hello',
  setSearch: () => {},
  results: [
    {
      title: 'aaa',
      author_name: 'aaa',
      first_publish_year: '1111',
      key: '/works/aaaa',
    },
    {
      title: 'bbb',
      author_name: 'bbb',
      first_publish_year: '2222',
      key: '/works/bbb',
    },
    {
      title: 'ccc',
      author_name: 'ccc',
      first_publish_year: '3333',
      key: '/works/ccc',
    },
    {
      title: 'ddd',
      author_name: 'ddd',
      first_publish_year: '4444',
      key: '/works/ddd',
    },
    {
      title: 'eee',
      author_name: 'eee',
      first_publish_year: '5555',
      key: '/works/eee',
    },
    {
      title: 'fff',
      author_name: 'fff',
      first_publish_year: '6666',
      key: '/works/fff',
    },
    {
      title: 'ggg',
      author_name: 'ggg',
      first_publish_year: '7777',
      key: '/works/ggg',
    },
    {
      title: 'hhh',
      author_name: 'hhh',
      first_publish_year: '1111',
      key: '/works/hhh',
    },
    {
      title: 'iii',
      author_name: 'iii',
      first_publish_year: '2222',
      key: '/works/iii',
    },
    {
      title: 'jjj',
      author_name: 'jjj',
      first_publish_year: '3333',
      key: '/works/jjjj',
    },
    {
      title: 'kkk',
      author_name: 'kkk',
      first_publish_year: '4444',
      key: '/works/kkk',
    },
    {
      title: 'lll',
      author_name: 'lll',
      first_publish_year: '5555',
      key: '/works/lll',
    },
    {
      title: 'mmm',
      author_name: 'mmm',
      first_publish_year: '6666',
      key: '/works/mmm',
    },
    {
      title: 'nnn',
      author_name: 'nnn',
      first_publish_year: '7777',
      key: '/works/nnn',
    },
  ],
  setResults: () => {},
};

const localStorageMock: Storage = NewFakeLocalStorage();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Tests for the Pagination component', () => {
  const mockFetch = createFetchMock(vi);

  beforeAll(() => {
    mockFetch.enableMocks();
    mockFetch.mockResponse((request) => {
      if (/search\.json/.test(request.url)) {
        return JSON.stringify({ docs: containerContext.results });
      }
      if (/works/.test(request.url)) {
        const queryParamsIndex = request.url.indexOf('.json');
        const key = request.url.substring(
          request.url.lastIndexOf('/') + 1,
          queryParamsIndex == -1 ? undefined : queryParamsIndex
        );
        return JSON.stringify(
          containerContext.results.filter((work) => work.key.includes(key))[0]
        );
      }
      throw Error();
    });
  });

  afterEach(() => {
    cleanup();
    fetchMock.mockClear();
  });

  screen.debug();

  it('updates URL query parameter when page changes.', async () => {
    const router = createMemoryRouter(AppRouterConfig);
    render(<RouterProvider router={router} />);

    const searchButton = screen.getByRole('search_button');
    await userEvent.click(searchButton);

    const next = screen.getByRole('nextBtn');
    await userEvent.click(next);
    expect(router.state.location.search).toContain('page=2');

    const prev = screen.getByRole('prevBtn');
    await userEvent.click(prev);
    expect(router.state.location.search).toContain('page=1');
  });

  afterAll(() => {
    mockFetch.dontMock();
  });
});

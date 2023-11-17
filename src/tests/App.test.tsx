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
  ],
  setResults: () => {},
};

export function NewFakeLocalStorage(): Storage {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string): string | null => store[key] || null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    key: (index: number) => Object.keys(store)[index] || null,
    removeItem: (key: string) => delete store[key],
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
  } as Storage;
}

const localStorageMock: Storage = NewFakeLocalStorage();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Tests for Card component', () => {
  const mockFetch = createFetchMock(vi);
  let calledAPI = false;

  beforeAll(() => {
    mockFetch.enableMocks();
    mockFetch.mockResponse((request) => {
      if (/search\.json/.test(request.url)) {
        calledAPI = true;
        return JSON.stringify({ docs: containerContext.results });
      }
      if (/works/.test(request.url)) {
        const queryParamsIndex = request.url.indexOf('.json');
        const key = request.url.substring(
          request.url.lastIndexOf('/') + 1,
          queryParamsIndex == -1 ? undefined : queryParamsIndex
        );
        calledAPI = true;
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

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const router = createMemoryRouter(AppRouterConfig);
    render(<RouterProvider router={router} />);
    const searchButton = screen.getByRole('search_button');
    await userEvent.click(searchButton);

    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    const detailsSection = await screen.findByRole('details_section_container');

    expect(detailsSection).toBeTruthy();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    const router = createMemoryRouter(AppRouterConfig);
    render(<RouterProvider router={router} />);
    const searchButton = screen.getByRole('search_button');
    await userEvent.click(searchButton);

    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    expect(calledAPI).toBeTruthy();
  });

  // it('Clicking the Search button saves the entered value to the store', async () => {
  //   const router = createMemoryRouter(AppRouterConfig);
  //   render(<RouterProvider router={router} />);
  //   const searchInput = screen.getByRole('search_input');
  //
  //   await userEvent.click(searchInput);
  //   await userEvent.clear(searchInput);
  //   await userEvent.paste('blah blah');
  //
  //   const searchButton = screen.getByRole('search_button');
  //   await userEvent.click(searchButton);
  //
  //   expect(DefaultLs_wrapper.getLastSearch()).toBeTruthy();
  // });

  // it('Check that the component retrieves the value from the local storage upon mounting', async () => {
  //   DefaultLs_wrapper.setLastSearch('bye-bye');
  //
  //   const router = createMemoryRouter(AppRouterConfig);
  //   render(<RouterProvider router={router} />);
  //
  //   const searchInput = screen.getByRole('search_input');
  //   expect(searchInput.getAttribute('value')).toEqual('bye-bye');
  // });

  it('404 page is displayed when navigating to an invalid route.', async () => {
    const router = createMemoryRouter(AppRouterConfig, {
      initialEntries: ['/fuuuuuuuuuu'],
    });
    render(<RouterProvider router={router} />);
    const notFound = screen.getByRole('NotFoundPage');
    expect(notFound).toBeTruthy();
  });

  afterAll(() => {
    mockFetch.dontMock();
  });
});

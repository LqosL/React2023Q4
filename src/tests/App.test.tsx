import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Page from "../pages";
import NotFound from "../pages/404";

// const containerContext = {
//   searchString: 'hello',
//   results: [
//     {
//       title: 'aaa',
//       author_name: 'aaa',
//       first_publish_year: '1111',
//       key: '/works/aaaa',
//     },
//     {
//       title: 'bbb',
//       author_name: 'bbb',
//       first_publish_year: '2222',
//       key: '/works/bbb',
//     },
//     {
//       title: 'ccc',
//       author_name: 'ccc',
//       first_publish_year: '3333',
//       key: '/works/ccc',
//     },
//     {
//       title: 'ddd',
//       author_name: 'ddd',
//       first_publish_year: '4444',
//       key: '/works/ddd',
//     },
//     {
//       title: 'eee',
//       author_name: 'eee',
//       first_publish_year: '5555',
//       key: '/works/eee',
//     },
//     {
//       title: 'fff',
//       author_name: 'fff',
//       first_publish_year: '6666',
//       key: '/works/fff',
//     },
//     {
//       title: 'ggg',
//       author_name: 'ggg',
//       first_publish_year: '7777',
//       key: '/works/ggg',
//     },
//   ],
// };

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
let calledAPI = false;
describe('Tests for Card component', () => {
  // const mockFetch = createFetchMock(vi);


  beforeAll(() => {
  });

  beforeEach(() => {
    vi.mock('next/router', () => {
      const newUseRouter = () => {
        return {
          push: () => {
            calledAPI = true;
          }
        };
      };
      return { useRouter: newUseRouter };
    })
  })
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
    // fetchMock.mockClear();
  });

  screen.debug();

  it('Validate that clicking on a card opens a detailed card component', async () => {

    // const props: PageState = {
    //   search: 'hello',
    //   details: undefined,
    //   page: '1',
    //   count: '7',
    //   json: {docs: []},
    // }

    render(<Page
        search={'hello'}
        details={undefined}
        page={'1'}
        count={'7'}
        json={{docs: [{
            title: 'aaa',
            author_name: 'aaa',
            first_publish_year: '1111',
            key: 'aaa',
          }]}}
  />);

    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    const detailsSection = await screen.findByRole('details_section_container');

    expect(detailsSection).toBeTruthy();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {

    render(<Page
        search={'hello'}
        details={undefined}
        page={'1'}
        count={'7'}
        json={{docs: [{
            title: 'aaa',
            author_name: 'aaa',
            first_publish_year: '1111',
            key: 'aaa',
          }]}}
    />);


    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    expect(calledAPI).toBeTruthy();
  });

  it('404 page is displayed when navigating to an invalid route.', async () => {
    render(<NotFound />);
    const notFound = screen.getByRole('NotFoundPage');
    expect(notFound).toBeTruthy();
  });

  // afterAll(() => {
  //   mockFetch.dontMock();
  // });
});

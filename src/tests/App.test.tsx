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
import Page, { getServerSideProps } from '../pages';
import NotFound from '../pages/404';
import { Request } from '../types/Request';
import { GetServerSidePropsContext } from 'next';
import createFetchMock from 'vitest-fetch-mock';

const containerContext = {
  searchString: 'hello',
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
};

let calledAPI = false;
const hrefs: [string] = ['initial'];
describe('Tests for Card component', () => {
  const mockFetch = createFetchMock(vi);

  beforeAll(() => {});

  beforeEach(() => {
    vi.mock('next/router', () => {
      const newUseRouter = () => {
        return {
          push: (href: string) => {
            hrefs.push(href);
            calledAPI = true;
          },
        };
      };
      return { useRouter: newUseRouter };
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
    mockFetch.mockClear();
  });

  screen.debug();

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <Page
        search={'hello'}
        details={undefined}
        page={'1'}
        count={'7'}
        json={{
          docs: [
            {
              title: 'aaa',
              author_name: 'aaa',
              first_publish_year: '1111',
              key: 'aaa',
            },
          ],
        }}
      />
    );

    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    const detailsSection = await screen.findByRole('details_section_container');

    expect(detailsSection).toBeTruthy();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    render(
      <Page
        search={'hello'}
        details={undefined}
        page={'1'}
        count={'7'}
        json={{
          docs: [
            {
              title: 'aaa',
              author_name: 'aaa',
              first_publish_year: '1111',
              key: 'aaa',
            },
          ],
        }}
      />
    );

    const card = (await screen.findAllByRole('results_unit'))[0];
    await userEvent.click(card);

    expect(calledAPI).toBeTruthy();

    const historyLength = hrefs.length;

    const next = (await screen.findAllByRole('nextBtn'))[0];
    await userEvent.click(next);

    expect(historyLength).toBeLessThan(hrefs.length);
  });

  it('Check that clicking apply triggers an additional API call to update page size', async () => {
    render(
      <Page
        search={'hello'}
        details={undefined}
        page={'1'}
        count={'7'}
        json={{
          docs: [
            {
              title: 'aaa',
              author_name: 'aaa',
              first_publish_year: '1111',
              key: 'aaa',
            },
          ],
        }}
      />
    );

    const historyLength = hrefs.length;

    const submit = (await screen.findAllByRole('page_size_submit'))[0];
    await userEvent.click(submit);

    expect(historyLength).toBeLessThan(hrefs.length);
  });

  it('404 page is displayed when navigating to an invalid route.', async () => {
    render(<NotFound />);
    const notFound = screen.getByRole('NotFoundPage');
    expect(notFound).toBeTruthy();
  });

  it('getServerSideProps works properly on no context params and query', async () => {
    const query: Request = {
      search: 'sample',
      page: '1',
      count: '10',
    };
    const props = {
      query,
    };
    mockFetch.mockOnce(() => {
      return JSON.stringify(containerContext);
    });
    const resultProps = await getServerSideProps(
      props as GetServerSidePropsContext
    );

    expect(resultProps.props.page).toBe(query.page);
    expect(resultProps.props.count).toBe(query.count);
    expect(resultProps.props.search).toBe(query.search);
  });
});

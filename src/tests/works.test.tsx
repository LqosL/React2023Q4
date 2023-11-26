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
import { getServerSideProps } from '../pages/works/[id]';
import NotFound from '../pages/404';
import { Request } from '../types/Request';
import { GetServerSidePropsContext } from 'next';
import createFetchMock from 'vitest-fetch-mock';

const currentTestDetail = {
  title: 'aaa',
  author_name: 'aaa',
  first_publish_year: '1111',
  key: '/works/aaaa',
  id: 'aaaa',
};

const hrefs: [string] = ['startPoint'];
describe('Tests for Works page component', () => {
  const mockFetch = createFetchMock(vi);

  beforeAll(() => {});

  beforeEach(() => {
    vi.mock('next/router', () => {
      const newUseRouter = () => {
        return {
          push: (href: string) => {
            hrefs.push(href);
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

  it('404 page is displayed when navigating to an invalid route in works pages folder.', async () => {
    render(<NotFound />);
    const notFound = screen.getByRole('NotFoundPage');
    expect(notFound).toBeTruthy();
  });

  it('getServerSideProps works properly on no context params and query in works directory', async () => {
    const query: Request = {
      search: 'hello',
      page: '1',
      count: '7',
    };
    const props = {
      query,
      params: {
        id: currentTestDetail.id,
      },
    };
    mockFetch.mockResponse(() => {
      return JSON.stringify(currentTestDetail);
    });
    const resultProps = await getServerSideProps(
      props as unknown as GetServerSidePropsContext
    );

    expect(resultProps.props.page).toBe(query.page);
    expect(resultProps.props.count).toBe(query.count);
    expect(resultProps.props.search).toBe(query.search);
  });
});

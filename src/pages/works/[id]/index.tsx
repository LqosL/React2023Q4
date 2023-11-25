import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  getServerSideProps as indexGetServerSideProps,
  pageState,
  default as IndexPage,
} from '../../index';
import { Detail } from '../../../types/Detail';

export const getServerSideProps = (async (ctx) => {
  const baseProperties = await indexGetServerSideProps(ctx);
  const id = (ctx.params as { id: string }).id;

  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  const details: Detail = await res.json();

  return {
    props: {
      ...baseProperties.props,
      details: {
        details: details,
        id: id,
      },
    },
  };
}) satisfies GetServerSideProps<pageState>;

export default function Page(
  pageState: InferGetServerSidePropsType<typeof getServerSideProps> & pageState
) {
  return IndexPage(pageState);
}

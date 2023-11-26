import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DetailsSection from '../components/SectionDetails';
import SectionDetailsContainer from '../components/SectionDetailsContainer';
import React from 'react';
import Page from "../pages";
import userEvent from "@testing-library/user-event";
import {beforeEach, vi} from "vitest";


const details = {
  title: 'aaa',
  description: {
    value: 'aaa',
  },
  key: 'aaa',
  authors: [{ author: { key: 'aaa' } }],
};
describe('Loading indicator is displayed while fetching data', () => {
  afterEach(() => cleanup());
  it('Shows loading indicator', async () => {
    screen.debug();
    render(
        <SectionDetailsContainer details={{details: details, id: 'aaa'}} currentDetailKey={'bbb'} closeDetails={()=>{}}/>
        // <DetailsSection details={undefined} onClickOutside={() => {}} />
    );

    await screen.findByRole('details_loader');
    const a = screen.getByRole('details_loader');
    expect(a).toBeTruthy();
  });
});

describe('It correctly displays the detailed card data', () => {
  afterEach(() => cleanup());
  it('displays the detailed card data', async () => {
    screen.debug();
    render(
        <DetailsSection details={details} onClickOutside={() => {}} />
    );

    await screen.findByRole('details_list');
    const a = screen.getByRole('details_list');
    expect(a.children[0].innerHTML).contains('Title:');
    expect(a.children[0].innerHTML).contains(details.title);
    expect(a.children[1].innerHTML).contains('Description:');
    expect(a.children[1].innerHTML).contains(details.description.value);
    expect(a.children[3].innerHTML).contains(' Open Library Book link:');
    expect(a.children[3].innerHTML).contains(
      'https://openlibrary.org' + details.key
    );
    expect(a.children[4].innerHTML).contains('Open Library Author link:');
    expect(a.children[4].innerHTML).contains(
      'https://openlibrary.org' + details.authors[0].author.key
    );
  });
});

describe('Clicking the close button hides the component', () => {
  beforeEach(() => {
    vi.mock('next/router', () => {
      const newUseRouter = () => {
        return {
          push: () => {
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


  afterEach(() => cleanup());
  it('Hides the component', async () => {
    screen.debug();
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

    expect(await screen.findByRole('details_section_container')).toBeTruthy();

    const closebutton = screen.getByRole('closeDetailsBtn');
    await userEvent.click(closebutton);

    let exists = false;
    try {
      await screen.findByRole('details_section_container');
      exists = true;
    } catch (e) {
      exists = false;
    }
    expect(exists).toBeFalsy();
  });
});

import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DetailsSection from '../components/SectionDetails';
import SectionDetailsContainer from '../components/SectionDetailsContainer';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { updateViewMode } from '../redux/viewModeSlice';

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
      <Provider store={store}>
        <DetailsSection
          isLoading={true}
          details={details}
          onClickOutside={() => {}}
        />
      </Provider>
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
      <Provider store={store}>
        <DetailsSection
          isLoading={false}
          details={details}
          onClickOutside={() => {}}
        />
      </Provider>
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
  afterEach(() => cleanup());
  it('Hides the component', async () => {
    screen.debug();
    store.dispatch(updateViewMode(true));
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/test']}>
          <Routes>
            <Route path={'/'} element={<></>}></Route>
            <Route
              path={'/test'}
              element={<SectionDetailsContainer key={details.key} />}
            ></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
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

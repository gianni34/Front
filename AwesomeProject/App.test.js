import React from 'react';
import Login from './App';
import Example from './Example';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Example />).toJSON();
  expect(rendered).toBeTruthy();
});

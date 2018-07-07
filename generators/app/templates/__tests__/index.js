import React from 'react';
import <%= camelComponentName %> from '../src/index';
import renderer from 'react-test-renderer';

describe('<%= camelComponentName %>', () => {
  it('test', () => {
    const tree = renderer.create(<<%= camelComponentName %> />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

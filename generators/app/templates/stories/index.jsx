import React from 'react';
import { storiesOf } from '@storybook/react';
import <%= camelComponentName %> from '../src/index.jsx';

storiesOf('Message', module)
  .add('Unicorn', () => <<%= camelComponentName %> content="Unicorn" />)
  .add('Rainbow', () => <<%= camelComponentName %> content="Rainbow" />);

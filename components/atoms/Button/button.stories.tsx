import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Button from '.';

storiesOf('Button', module)
  .add('Default with text', () => <Button>Button</Button>)
  .add('Primary with text', () => (
    <Button params={{ color: 'primary' }}>Button</Button>
  ))
  .add('Secondary with text', () => (
    <Button params={{ color: 'secondary' }}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="emoji">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

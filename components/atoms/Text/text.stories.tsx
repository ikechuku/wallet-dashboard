import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Text from '.';

storiesOf('Text', module)
  .add('heading 1', () => <Text variant="h1">h1 heading</Text>)
  .add('heading 2', () => <Text variant="h2">h2 heading</Text>)
  .add('heading 3', () => <Text variant="h3">h3 heading</Text>)
  .add('heading 4', () => <Text variant="h4">h4 heading</Text>)
  .add('heading 5', () => <Text variant="h5">h5 heading</Text>)
  .add('heading 6', () => <Text variant="h6">h6 heading</Text>)
  .add('button', () => <Text variant="button">button</Text>)
  .add('subtitle1', () => <Text variant="subtitle1">subtitle1</Text>)
  .add('subtitle2', () => <Text variant="subtitle2">subtitle2</Text>)
  .add('body1', () => <Text variant="body1">body1</Text>)
  .add('body2', () => <Text variant="body2">body2</Text>)
  .add('overline', () => <Text variant="overline">overline</Text>)
  .add('caption', () => <Text variant="caption">caption</Text>);

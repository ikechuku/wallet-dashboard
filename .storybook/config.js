import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { StylesProvider } from '@material-ui/styles';
import ThemeDecorator from './themeDecorator';

const req = require.context('../components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);

const StylesDecorator = (storyFn) => (
  <StylesProvider injectFirst>{storyFn()}</StylesProvider>
);

addDecorator(StylesDecorator);
addDecorator(ThemeDecorator);

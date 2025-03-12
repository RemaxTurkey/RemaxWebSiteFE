import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import I18nProvider from '../src/i18n/I18nProvider';
import '../src/styles/main.scss';

const withI18n: Decorator = (Story) => (
  <I18nProvider locale="tr">
    <Story />
  </I18nProvider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withI18n],
};

export default preview; 
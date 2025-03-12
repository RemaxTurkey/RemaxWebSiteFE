import React from 'react';
import I18nProvider from '@/i18n/I18nProvider';
import { StoryFn, StoryContext } from '@storybook/react';

export const withI18n = (Story: StoryFn, context: StoryContext) => {
  return (
    <I18nProvider locale="tr">
      <Story />
    </I18nProvider>
  );
} 
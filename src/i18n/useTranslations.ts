"use client";

import { useIntl } from 'react-intl';

export function useTranslations() {
  const intl = useIntl();

  return {
    t: (id: string, values?: Record<string, any>) => intl.formatMessage({ id }, values),
  };
} 
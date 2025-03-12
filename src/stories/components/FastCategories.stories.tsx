// src/components/FastCategories/FastCategories.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import FastCategories from '@/components/FastCategories/FastCategories'

const meta: Meta<typeof FastCategories> = {
  title: 'Components/FastCategories',
  component: FastCategories,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FastCategories>;

export const Default: Story = {
  args: {},
};

export const WithCustomCategories: Story = {
  args: {
    categories: [
      { id: 'konut', label: 'Konutlar', href: '/konut' },
      { id: 'luks', label: 'Lüks Konutlar', href: '/luks-konutlar' },
      { id: 'ticari', label: 'Ticari Gayrimenkuller', href: '/ticari' },
      { id: 'arsa', label: 'Arsa ve Arazi', href: '/arsa-arazi' },
    ],
  },
};
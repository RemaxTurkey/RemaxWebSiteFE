// src/components/HomeFilter/HomeFilter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import HomeFilter from '@/components/HomeFilter/HomeFilter'

const meta: Meta<typeof HomeFilter> = {
  title: 'Components/HomeFilter',
  component: HomeFilter,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof HomeFilter>;

export const Default: Story = {
  args: {
    defaultCategory: 'konut',
  },
};
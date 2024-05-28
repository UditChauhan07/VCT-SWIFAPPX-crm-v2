import color from '@/utils/color';

export const fields = {
  name: {
    type: 'stringWithColor',
    required: true,
  },
  description: {
    type: 'textarea',
    required: true,
  },
  color: {
    type: 'Color',
    options: [...color],
    required: true,
  },
  enabled: {
    type: 'boolean',
    label: 'Status',
  },
};

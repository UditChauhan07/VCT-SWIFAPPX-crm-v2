import color from '@/utils/color';

export const fields = {
  name: {
    type: 'stringWithColor',
    required: true,
  },
  description: {
    type: 'textarea',
  },
  color: {
    type: 'color',
    options: [...color],
    required: true,
    label: 'Color',
  },
  enabled: {
    type: 'boolean',
    // required: true,
  },
};

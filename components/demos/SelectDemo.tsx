import { Demo } from './Demo';

export const SelectDemo = () => {
  const fields: any = [
    {
      type: 'select',
      name: 'shipping',
      label: 'Select shipping',
      placeholder: 'Select an option...',
      helpText: 'Ground deliveries can take up to several millennia.',
      default: 'FedEx Ground',
      choices: [
        '---UPS',
        { label: 'UPS Ground', value: 'ups-ground-234' },
        { label: 'UPS Same Day', value: 'ups-sd-234', disabled: true },
        'UPS Air',
        '---Fedex',
        'FedEx Ground',
        'FedEx Air',
        '---Erie Canal',
        { label: 'Barge +Mule Power', value: 'boat-w-sal' },
        'Barge Only'
      ],
      options: {
        required: 'Select a valid shipping option to proceed with order',
      },
    }
  ];

  return <Demo fields={fields} />;
};
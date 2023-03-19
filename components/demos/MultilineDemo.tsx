import { Demo } from './Demo';

export const MultilineDemo = () => {
  const fields: any = [
    {
      type: 'multiline', // specifies this should render as multiline field
      name: 'message',
      placeholder: 'Enter a message',
      helpText: 'If you need inspiration, look inward.',
      label: 'Your Message'
    }
  ];

  return <Demo fields={fields} />;
};
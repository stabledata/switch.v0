import { Demo } from './Demo';

export const RadioDemo = () => {
  const fields: any = [
    {
      type: 'radio',
      name: 'dinner-choice',
      label: 'Dinner choice',
      helpText: 'Note, the vegetarian option is vegan.',
      choices:[
        { label: 'Chicken', value: 'chicken' },
        { label: 'Fish', value: 'fish' },
        'Vegetarian',
      ]
    }
  ];

  return <Demo fields={fields} />;
};
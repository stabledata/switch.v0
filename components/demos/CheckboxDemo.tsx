import { Demo } from './Demo';

export const CheckboxDemo = () => {
  const fields: any = [
    {
      type: 'checkbox',
      name: 'accept-terms', // note, this will not be defined in state when box is not checked
      label: 'I accept the terms of the agreement',
      HelpText: () => (<div>To continue, you must accept the <a href="#">terms</a></div>),
      options: {
        required: 'You must accept the terms!',
      }
    }
  ];

  return <Demo fields={fields} />;
};
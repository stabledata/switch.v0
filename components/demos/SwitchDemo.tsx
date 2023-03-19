import { Demo } from './Demo';

export const SwitchDemo = () => {
  const fields: any = [
    {
      type: 'switch',
      name: 'vacation-mode',
      label: 'Enable vacation mode',
    }
  ];

  return <Demo fields={fields} />;
};
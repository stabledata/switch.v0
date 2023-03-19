import { Demo } from './Demo';

export const MediaDemo = () => {
  const fields: any = [
    {
      type: 'media',
      name: 'image',
      label: 'Upload a banner',
      helpText: 'Please keep files below 30mb', // not a real config option, yet
      previewType: 'hero', // can be 'thumb' or 'hero' for full width upload
      options: {
        required: 'You simply must upload an image!'
      }
    }
  ];

  return <Demo fields={fields} />;
};
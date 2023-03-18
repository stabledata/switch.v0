import { RDF, useRDF } from '../rdf';

export const TextDemo = () => {
  const fields: any = [
    {
      type: 'text',
      name: 'fullName',
      placeholder: 'Enter your name',
      // HelpText: ({ fullName }) => {
      //   if (fullName > '') {
      //     return <>Hello {fullName} we hope you are enjoying RDF.</>;
      //   }
      //   return <>Your full name is required so that we know who you are.</>;
      // },
      helpText: 'Your full name is required so that we know who you are.',
      label: 'Your Full Name',
      observe: true,
      options: {
        required: 'This field is required.',
      },
    }
  ];

  const onSubmit = async (formData, formState) => {
    // noop for now...
  };
  const form = useRDF(fields, onSubmit);

  return (
    <div className="favorites-form">
      <RDF form={form} />
    </div>
  );
};
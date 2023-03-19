import { useState } from 'react';
import { RDF } from '../../rdf/RDF';
import { useRDF } from '../../rdf/useRDF';

export const Demo = ({ fields }) => {
  const [data, setData] = useState(null);
  const onSubmit = async (_, state: any) => {
    setData(state);
  };
  const form = useRDF(fields, onSubmit);

  return (
    <div className="favorites-form">
      <RDF form={form} />
      {data
        ? <pre>{JSON.stringify(data, null, 2)}</pre>
        : null
      }
    </div>
  );
};
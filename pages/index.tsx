import React, { useState } from 'react';
import Head from 'next/head';
import { RDF } from '../rdf/RDF';
import { options, FormState } from '../form';
import { useRDF } from '../rdf/useRDF';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [dataInFlight, setDataInFlight] = useState<boolean>(false);
  const form = useRDF(options, async (
    fd: FormData,  // useful for actually sending info later
    state: FormState
  ): Promise<void> => {
    // set in flight
    setDataInFlight(true);

    // post the form data
    try {
      const postRequest = await fetch('/api/send', {
        method: 'POST',
        body: fd
      });

      const result = await postRequest.json();

      setData(state);
      setDataInFlight(false);
    } catch (e) {
      console.error(e);
      setDataInFlight(false);
    }
  });

  return (
    <div className="container">
      <Head>
        <title>Radix Declarative Form</title>
        <meta name="description" content="Declaratively render form templates with RadixUI, react-hook-from with vanilla CCS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h2 className="title">Radix Declarative Form</h2>
        <p>
          A React component that&nbsp;
          <a href="https://github.com/cif/radix-declarative-form/blob/main/form.tsx">declaratively</a> renders beautiful and customizable forms using <a href="https://www.radix-ui.com/docs/primitives/overview/introduction">RadixUI</a> with <a href="https://github.com/cif/radix-declarative-form/blob/main/styles/rds.css">plain CSS</a> powered by<br /><a href="https://react-hook-form.com/get-started#">react-form-hook</a>.
        </p>

        <h3>Demo</h3>
        <RDF<FormState> form={form} isInFlight={dataInFlight} />
        <div className="preview">
          {dataInFlight ? <h3>Submitting data..!</h3> : null}
          <h2>Submitted data:</h2>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </main>

      <footer className="footer">
        Just another NextJS app deployed on Vercel.
      </footer>
    </div>
  );
}

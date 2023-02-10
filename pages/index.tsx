import React, { useState } from 'react'
import Head from 'next/head';
import { RDF } from '../components/RDF';
import type { RDFOptions } from '../components/useRDF';

type FormData = {
  simple: string
}

const rdfOptions: RDFOptions = {
  fields: [
    {
      type: 'text',
      name: 'simple',
      label: 'A Simple Text Entry',
      placeholder: 'This is placeholder text'
    },
    {
      type: 'text',
      name: 'simple',
      label: 'A Simple Text Entry',
      placeholder: 'This is placeholder text'
    }
]
};


export default function Home() {
  const [data, setData] = useState<FormData>(null)
  const demoSubmitHandler= (data: FormData): void => setData(data)
  const description = 'Declaratively render beautiful and customizable forms with radix-ui, plain CSS and react-form-hook'
  return (
    <div className="container">
      <Head>
        <title>Radix Declarative Form</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h2 className="title">Radix Declarative Form</h2>
        <p>{description}</p>
        <RDF<FormData>
          options={rdfOptions}
          submitButtonLabel='Send it!'
          handleSubmit={demoSubmitHandler}
          debug={true}
        />
        <div className="preview">
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

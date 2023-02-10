import React, { useState } from 'react'
import Head from 'next/head';
import { RDF } from '../components/RDF';
import { options } from './form';

type FormData = {
  simple: string
}

export default function Home() {
  const [data, setData] = useState<FormData>(null)
  const demoSubmitHandler= (data: FormData): void => setData(data)
  const description = 'Declaratively render beautiful and customizable forms with radix-ui, plain CSS, powered by react-form-hook.'
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
          options={options}
          submitButtonLabel='Send it!'
          handleSubmit={demoSubmitHandler}
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

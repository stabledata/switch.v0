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

    // validation testing from rhf
    // https://react-hook-form.com/get-started#Applyvalidation
    {
      type: 'text',
      name: 'necessary',
      label: 'A Required Text Field',
      placeholder: 'you better enter something here',
      options: {
        required: 'This field is required, fill it out!'
      }
    },
    // max len
    {
      type: 'text',
      name: 'max',
      label: 'Short Code',
      placeholder: '12345',
      options: {
        maxLength : {
          value: 3,
          message: 'You can only enter 3 characters in this field'
        }
      }
    },
    // custom validation
    {
      type: 'text',
      name: 'customizing',
      label: 'Enter anything that contains "ing"',
      placeholder: 'e.g. Running',
      options: {
        validate: ((value) => {
          if (value.indexOf('ing') < 0) {
            return 'That input does not contain "ing"'
          }
        })
      }
    },
    // multiline input
    {
      type: 'multiline',
      name: 'story',
      label: 'Tell us your story',
      placeholder: 'This is a longer input option',
    },
]
};


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
        <h2 className="title">Radix<br />Declarative<br /> Form</h2>
        <p>{description}</p>
        <RDF<FormData>
          options={rdfOptions}
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

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { RDF } from '../rdf/RDF';
import { options, FormState } from '../form';
import { useRDF } from '../rdf/useRDF';
import { Footer } from '../components/Footer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function Home({ content }) {
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
      console.log('response from api:', result);
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
        <div className="intro"><ReactMarkdown>{content}</ReactMarkdown></div>
        <Link className="docs-link" href="/docs/start">
          Documentation
        </Link>
        <h3>Live Demo</h3>
        <div className="demo">
          <RDF<FormState> form={form} isInFlight={dataInFlight} />
          <div className="preview">
            {dataInFlight ? <h3>Submitting data...</h3> : null}
            {data ?
              <div>
                <h2>Submitted data:</h2>
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            : null
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps = () => {
  const slug = 'intro';
  const filePath = path.resolve(process.cwd(), `./markdown/${slug}.md`);
  const parsed = matter(fs.readFileSync(filePath).toString());
  return {
    props: {
      content: parsed.content,
      meta: parsed.data
    }
  };
};
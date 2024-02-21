import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';
import { RDF } from '../rdf/RDF';
import { options as formDescription, FormState } from '../form';
import { useRDF } from '../rdf/useRDF';
import { Footer } from '../components/Footer';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function Home({ content }) {
  const [data, setData] = useState<any>(null);
  const [dataInFlight, setDataInFlight] = useState<boolean>(false);
  const form = useRDF(formDescription, async (
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
        <div className="cta-buttons">
          <Link className="docs-link" href="/docs/start">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Docs
          </Link>
          <Link className="docs-link" href="https://github.com/cif/radix-declarative-form" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Github
          </Link>
        </div>
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
import React from 'react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { Nav } from '../../components/Nav';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Footer } from '../../components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import syntaxStyle from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';
import remarkGfm from 'remark-gfm';

import { TextDemo } from '../../components/TextDemo';

const RenderLiveDemo = ({ demo }) => {
  if (demo === 'text') {
    return (
      <TextDemo />
    );
  }
};

export default function Docs({ content }) {
  return (
    <div className="container">
      <Head>
        <title>Radix Declarative Form (RDF) Docs</title>
        <meta name="description" content="Declaratively render form templates with RadixUI, react-hook-from with vanilla CCS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="docs-layout">
        <Nav />
        <main>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h5: ({ node, ...props }) => {
                const demo = props.children[0];
                return (<RenderLiveDemo demo={demo} />);
              },
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={syntaxStyle}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticPaths = () => {
  const mdPath = path.resolve(process.cwd(), './markdown/');
  const md = fs.readdirSync(mdPath);
  const paths = md.map(file => ({
    params: { slug: file.replaceAll('.md', '') }
  }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = ({ params }: GetStaticPropsContext) => {
  const slug = params.slug;
  const filePath = path.resolve(process.cwd(), `./markdown/${slug}.md`);
  const parsed = matter(fs.readFileSync(filePath).toString());
  return {
    props: {
      content: parsed.content,
      meta: parsed.data
    }
  };
};
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
// demo components
import { TextDemo } from '../../components/demos/TextDemo';
import { MultilineDemo } from '../../components/demos/MultilineDemo';
import { CheckboxDemo } from '../../components/demos/CheckboxDemo';
import { SelectDemo } from '../../components/demos/SelectDemo';
import { RadioDemo } from '../../components/demos/RadioDemo';
import { SwitchDemo } from '../../components/demos/SwitchDemo';
import { MediaDemo } from '../../components/demos/MediaDemo';


const RenderLiveDemo = ({ demo }) => {
  switch (demo) {
    case 'text':
      return <TextDemo />;
    case 'multiline':
      return <MultilineDemo />;
    case 'checkbox':
      return <CheckboxDemo />;
    case 'select':
      return <SelectDemo />;
    case 'radio':
      return <RadioDemo />;
    case 'switch':
      return <SwitchDemo />;
    case 'media':
      return <MediaDemo />;
    default:
      return null;
  }
};

export default function Docs({ content, meta }) {
  return (
    <div className="container">
      <Head>
        <title>{meta.title || 'React Declarative Form (RDF) Docs'}</title>
        <meta name="description" content="Declarative form template library with React-UI, react-hook-from. Styled with vanilla CCS" />
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
                return (
                  <div className="demo">
                    <RenderLiveDemo demo={demo} />
                  </div>
                );
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
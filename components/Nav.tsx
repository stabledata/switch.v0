import Link from 'next/link';

export const Nav = () => (
  <section className="nav">
    <Link className="back" href="/">Home</Link>
    <span>Documentation</span>
    <ul>
      <li><span>Quick Start</span></li>
      <li><Link href="/docs/start">Getting Started</Link></li>
      <li><Link href="/docs/style">Customizing Styles</Link></li>
      <li><span>Field Types</span></li>
      <li><Link href="/docs/text">Text Field</Link></li>
    </ul>
  </section>
);
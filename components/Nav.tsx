import Link from 'next/link';

export const Nav = () => (
  <section className="nav">
    <Link className="back" href="/">Home</Link>
    <span>Documentation</span>
    <ul>
      <li><span>Using RDF</span></li>
      <li><Link href="/docs/start">Getting Started</Link></li>
      <li><Link href="/docs/style">Customizing Styles</Link></li>
      <li><span>Fields</span></li>
      <li><Link href="/docs/text">Text Field</Link></li>
      <li><Link href="/docs/multiline">Multiline Field</Link></li>
      <li><Link href="/docs/checkbox">Checkbox</Link></li>
      <li><Link href="/docs/select">Select</Link></li>
      <li><Link href="/docs/radio">Radio Group</Link></li>
    </ul>
  </section>
);
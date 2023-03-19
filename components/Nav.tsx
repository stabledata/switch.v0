import Link from 'next/link';

export const Nav = () => (
  <section className="nav">
    <Link className="back" href="/">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </Link>
    <ul>
      <li><span>Using RDF</span></li>
      <li><Link href="/docs/start">Getting Started</Link></li>
      <li><Link href="/docs/style">Customizing Styles</Link></li>
      <li><span>Fields</span></li>
      <li><Link href="/docs/text">Single Line</Link></li>
      <li><Link href="/docs/multiline">Multiline</Link></li>
      <li><Link href="/docs/select">Select</Link></li>
      <li><Link href="/docs/radio">Radio</Link></li>
      <li><Link href="/docs/checkbox">Checkbox</Link></li>
      <li><Link href="/docs/switch">Switch</Link></li>
      <li><Link href="/docs/media">Media</Link></li>
    </ul>
  </section>
);
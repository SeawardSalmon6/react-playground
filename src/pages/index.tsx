import { Link } from 'react-router-dom';

import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';

export function PlaygroundHome() {
  return (
    <PGLayout>
      <section className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-4 text-center">
        <PGHeader title="React Playgound" tabTitle="Home" />
        <p className="text-lg">This is a playground for testing components and other things.</p>
      </section>
      <section className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-4xl font-bold">Live Demos</h2>
        <ul className="flex flex-col items-center justify-center gap-4">
          <li className="flex items-center justify-center gap-2">
            <Link to="/input-mask-demo" className="text-blue-600 hover:underline">
              Input Mask Demo
            </Link>
          </li>
        </ul>
      </section>
    </PGLayout>
  );
}

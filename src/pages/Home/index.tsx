import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';
import { PGPhoneInput } from '~/components/PGPhoneInput';
import { PagesLinksList } from '~/pages/Home/components/PagesLinksList';

export function PlaygroundHome() {
  return (
    <PGLayout>
      <section className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-4 text-center">
        <PGHeader tabTitle="Home" title="React Playground" />
        <p className="text-lg">This is a playground for testing components and other things.</p>
      </section>
      <section className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-4xl font-bold">Live Demos</h2>
        <PagesLinksList />
      </section>
      <PGPhoneInput onChange={console.log} />
    </PGLayout>
  );
}

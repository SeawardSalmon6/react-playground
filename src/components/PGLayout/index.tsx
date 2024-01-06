import { PropsWithChildren } from 'react';

export function PGLayout({ children }: PropsWithChildren) {
  return (
    <main className="bg-white font-sans h-screen overflow-x-hidden flex flex-col items-center justify-center gap-12 px-6 py-4">
      {children}
    </main>
  );
}

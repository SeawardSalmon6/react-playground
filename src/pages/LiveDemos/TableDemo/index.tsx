import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';
import { Table } from '~/components/Table';

export function TableDemo() {
  return (
    <PGLayout>
      <PGHeader tabTitle="Table Demo" title="Table Demo" />
      <Table />
    </PGLayout>
  );
}

import { ReactNode } from 'react';

import { PGHeaderLevelProp } from '~/components/PGHeader/types';

export const DEFAULT_SUFFIX = 'React Playground';

export const getHeader = (
  { level, title }: { level?: PGHeaderLevelProp; title: ReactNode } = { title: '' }
) => {
  switch (level) {
    case 1:
      return <h1>{title}</h1>;
    case 2:
      return <h2>{title}</h2>;
    case 3:
      return <h3>{title}</h3>;
    case 4:
      return <h4>{title}</h4>;
    case 5:
      return <h5>{title}</h5>;
    case 6:
      return <h6>{title}</h6>;
    default:
      return <h1>{title}</h1>;
  }
};

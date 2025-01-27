import { Link } from 'react-router-dom';

import { pagesLinks } from '~/pages/LiveDemos/constants';

export function PagesLinksList() {
  return (
    <ul className="flex flex-col items-center justify-center gap-4">
      {pagesLinks.map(({ to, label }) => (
        <li key={to} className="flex items-center justify-center gap-2">
          <Link className="text-blue-600 hover:underline" to={to}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

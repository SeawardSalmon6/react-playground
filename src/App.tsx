import { RouterProvider } from 'react-router-dom';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { router } from '~/routes/router';

dayjs.extend(customParseFormat);
dayjs.locale(ptBr);

export function App() {
  return <RouterProvider router={router} />;
}

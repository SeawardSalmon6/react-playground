import { createBrowserRouter } from 'react-router-dom';

import { PlaygroundHome } from '~/pages';
import { InputMaskDemo } from '~/pages/LiveDemos/InputMaskDemo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlaygroundHome />,
  },
  {
    path: '/input-mask-demo',
    element: <InputMaskDemo />,
  },
]);

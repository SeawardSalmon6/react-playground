import { createBrowserRouter } from 'react-router-dom';

import { PlaygroundHome } from '~/pages/Home';
import { InputMaskDemo } from '~/pages/LiveDemos/InputMaskDemo';
import { SendMessageBarChatDemo } from '~/pages/LiveDemos/SendMessageBarChatDemo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlaygroundHome />,
  },
  {
    path: '/input-mask-demo',
    element: <InputMaskDemo />,
  },
  {
    path: '/send-message-bar-char-demo',
    element: <SendMessageBarChatDemo />,
  },
]);

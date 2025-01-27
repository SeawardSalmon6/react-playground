// import { ReactNode, useState } from 'react';
import { MdSend } from 'react-icons/md';

// import { MessageBarProps } from '~/pages/LiveDemos/SendMessageBarChatDemo/MessageBar/types';

export function MessageBar() {
  // { placeholder }: MessageBarProps
  // const [message, setMessage] = useState('');
  // const [parsedMessage, setParsedMessage] = useState<ReactNode | null>(null);

  // const onKeyDown = (event: React.KeyboardEventHandler<HTMLParagraphElement>) => {
  //   console.log('here');

  //   // setMessage(event.);
  //   // setParsedMessage(value);
  // };

  return (
    <div className="flex items-center justify-between gap-4 max-w-[720px] w-full px-4 py-6 bg-slate-600 text-zinc-100 rounded-md font-sans text-base">
      <div className="w-full relative">
        {/* <p className="w-full" contentEditable onKeyDown={onKeyDown}>
          {parsedMessage}
        </p> */}
        <span className="absolute pointer-events-none top-[50%] translate-y-[-50%] left-0 text-zinc-100 opacity-50">
          {/* {message.length == 0 && placeholder} */}
        </span>
      </div>
      <button className="flex items-center justify-center size-6" type="button">
        <MdSend className="block w-full h-full" />
      </button>
    </div>
  );
}

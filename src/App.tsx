import { useState } from 'react';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { InputMask } from './components/InputMask';

dayjs.extend(customParseFormat);
dayjs.locale(ptBr);

export function App() {
  const [context, setContext] = useState('');
  const [context2, setContext2] = useState('');

  return (
    <main className="bg-white font-sans h-screen overflow-hidden flex flex-col items-center justify-center gap-4">
      <InputMask
        className="py-2 px-4 border-zinc-800 border-[1px] rounded-lg"
        name="date"
        mask={{
          mask: 'DD/MM/YYYY',
          rules: {
            DAY: { keyChar: 'DD', min: 1, max: 31, onlyNumbers: true },
            MONTH: { keyChar: 'MM', min: 1, max: 12, onlyNumbers: true },
            YEAR: { keyChar: 'YYYY', min: 1, max: 9999, onlyNumbers: true },
          },
        }}
        parser={({ masked }) =>
          masked.replace('_', '').length === 'DD/MM/YYYY'.length
            ? dayjs(masked, 'DD/MM/YYYY')
            : masked
        }
        onChange={(_, context) => setContext(JSON.stringify(context, null, 2))}
      />
      <pre>{context}</pre>
      <InputMask
        className="py-2 px-4 border-zinc-800 border-[1px] rounded-lg"
        name="cpf"
        maskChar={null}
        mask={{
          mask: 'DD-II-OO-DD',
          rules: {
            DAY: { keyChar: 'DD', min: 1, max: 31, onlyNumbers: true },
            II: { keyChar: 'II', validator: (value) => !/[^A-Za-z]/.test(value) },
            OO: { keyChar: 'OO', validator: (value) => !/[^A-Za-z]/.test(value) },
          },
        }}
        onChange={(_, context) => setContext2(JSON.stringify(context, null, 2))}
      />
      <pre>{context2}</pre>
    </main>
  );
}

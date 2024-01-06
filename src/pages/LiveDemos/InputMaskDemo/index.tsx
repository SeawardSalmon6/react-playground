import dayjs from 'dayjs';

import { InputMask } from '~/components/InputMask';
import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';
import { useJSONViewer } from '~/hooks/useJSONViewer';

export function InputMaskDemo() {
  const [input1JSON, setInput1JSON] = useJSONViewer();
  const [input2JSON, setInput2JSON] = useJSONViewer();

  return (
    <PGLayout>
      <PGHeader title="React Mask Live Demo" navigation={{ backTo: '/' }} />
      <div className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-4">
        <InputMask
          name="date"
          mask={{
            mask: 'DD/MM/YYYY',
            rules: {
              DAY: { keyChar: 'DD', min: 1, max: 31, onlyNumbers: true },
              MONTH: { keyChar: 'MM', min: 1, max: 12, onlyNumbers: true },
              YEAR: { keyChar: 'YYYY', min: 1, max: 9999, onlyNumbers: true },
            },
          }}
          placeholder="DD/MM/YYYY"
          parser={({ masked }) =>
            masked.replace('_', '').length === 'DD/MM/YYYY'.length
              ? dayjs(masked, 'DD/MM/YYYY')
              : masked
          }
          onChange={(_, context) => setInput1JSON(context)}
        />
        <pre className="block">{input1JSON}</pre>
        <InputMask
          name="cpf"
          placeholder="CPF"
          mask="999.999.999-99"
          onChange={(_, context) => setInput2JSON(context)}
        />
        <pre>{input2JSON}</pre>
      </div>
    </PGLayout>
  );
}

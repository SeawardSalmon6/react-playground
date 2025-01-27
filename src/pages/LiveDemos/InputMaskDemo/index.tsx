import { IMask, IMaskInput } from 'react-imask';

import dayjs from 'dayjs';

import { InputMask } from '~/components/InputMask';
import { PGHeader } from '~/components/PGHeader';
import { PGLayout } from '~/components/PGLayout';
import { useJSONViewer } from '~/hooks/useJSONViewer';
import { DayjsConstructorType } from '~/types/shared';

export function InputMaskDemo() {
  const [input1JSON, setInput1JSON] = useJSONViewer();
  const [input2JSON, setInput2JSON] = useJSONViewer();

  return (
    <PGLayout>
      <PGHeader navigation={{ backTo: '/' }} title="React Mask Live Demo" />
      <div className="max-w-96 w-full bg-white font-sans flex flex-col items-center justify-center gap-8">
        <label className="flex flex-col gap-2 w-full">
          <span className="font-semibold">Date Input</span>
          <IMaskInput
            blocks={{
              DD: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 31,
                maxLength: 2,
              },
              MM: {
                mask: IMask.MaskedRange,
                from: 1,
                to: 12,
                maxLength: 2,
              },
              YYYY: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 9999,
              },
            }}
            className="input-mask input"
            format={(date: DayjsConstructorType) => dayjs(date).format('DD/MM/YYYY')}
            lazy
            mask={Date as never}
            onAccept={(value) => {
              setInput1JSON({
                value: value.length === 8 ? dayjs(value, 'DDMMYYYY').format('YYYY-MM-DD') : value,
              });
            }}
            parse={(str) => dayjs(str, 'DD/MM/YYYY').format('YYYY-MM-DD')}
            pattern="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
            unmask
          />
          <pre>{input1JSON}</pre>
        </label>
        {/* <InputMask
          name="date"
          mask={{
            mask: 'DD/MM/YYYY',
            rules: {
              DAY: { keyChar: 'DD', min: 1, max: 31, onlyNumbers: true },
              MONTH: { keyChar: 'MM', min: 1, max: 12, onlyNumbers: true },
              YEAR: { keyChar: 'YYYY', min: 1900, max: 9999, onlyNumbers: true },
            },
          }}
          placeholder="DD/MM/YYYY"
          parser={({ masked }) =>
            masked.replace('_', '').length === 'DD/MM/YYYY'.length
              ? dayjs(masked, 'DD/MM/YYYY')
              : masked
          }
          onChange={(_, context) => setInput1JSON(context)}
        /> */}
        <label className="flex flex-col gap-2 w-full">
          <span className="font-semibold">CPF/CNPJ</span>
          <InputMask
            mask={{ cpf: '999.999.999-99', cnpj: '99.999.999/9999-99' }}
            maskChoicer={({ raw }) => (raw.length > 11 ? 'cnpj' : 'cpf')}
            name="cpf_cnpj"
            onChange={(_, context) => setInput2JSON(context)}
            placeholder="CPF/CNPJ"
          />
          <pre>{input2JSON}</pre>
        </label>
      </div>
    </PGLayout>
  );
}

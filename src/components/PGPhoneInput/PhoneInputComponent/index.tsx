import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { Input, InputProps, InputRef } from 'antd';

import { usePGPhoneInputContext } from '~/components/PGPhoneInput/context';
import { PhoneInputComponentProps } from '~/components/PGPhoneInput/PhoneInputComponent/types';

export const PhoneInputComponent = forwardRef(function AntDPhoneInput(
  { onChange, ...props }: PhoneInputComponentProps,
  ref: ForwardedRef<Partial<HTMLInputElement>>
) {
  const { currentCountryCode } = usePGPhoneInputContext();
  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(ref, () => inputRef.current?.input ?? {}, []);

  return (
    <Input
      {...(props as InputProps)}
      ref={inputRef}
      disabled={!currentCountryCode}
      onChange={(e) => {
        console.log({ value: e.target.value });
        // if (isValidPhoneNumber(e.target.value, { defaultCountry: currentCountryCode })) {
        onChange?.(e);
        // }
      }}
    />
  );
});

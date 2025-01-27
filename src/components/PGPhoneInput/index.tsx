import { useMemo, useState } from 'react';
import PhoneInput, { Country } from 'react-phone-number-input';

import { PGPhoneInputContext, usePGPhoneInputContext } from '~/components/PGPhoneInput/context';
import { PhoneInputComponent } from '~/components/PGPhoneInput/PhoneInputComponent';
import { SelectInputComponent } from '~/components/PGPhoneInput/SelectInputComponent';
import { PGPhoneInputProps } from '~/components/PGPhoneInput/types';

function PGPhoneInputComponent({ onChange }: PGPhoneInputProps) {
  const { setCurrentCountryCode } = usePGPhoneInputContext();

  return (
    <PhoneInput
      addInternationalOption={false}
      className="flex"
      countrySelectComponent={SelectInputComponent}
      defaultCountry="BR"
      inputComponent={PhoneInputComponent}
      onChange={onChange}
      onCountryChange={setCurrentCountryCode}
      withCountryCallingCode
    />
  );
}

export function PGPhoneInput(props: PGPhoneInputProps) {
  const [currentCountryCode, setCurrentCountryCode] = useState<Country | undefined>('BR');

  const value = useMemo(
    () => ({
      currentCountryCode,
      setCurrentCountryCode,
    }),
    [currentCountryCode]
  );

  return (
    <PGPhoneInputContext.Provider value={value}>
      <PGPhoneInputComponent {...props} />
    </PGPhoneInputContext.Provider>
  );
}

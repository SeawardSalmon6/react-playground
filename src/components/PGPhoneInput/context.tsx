import { createContext, useContext } from 'react';
import { Country } from 'react-phone-number-input';

import { SetState } from '~/types/shared';

type PGPhoneInputContextType = {
  currentCountryCode: Country | undefined;
  setCurrentCountryCode: SetState<PGPhoneInputContextType['currentCountryCode']>;
};

export const PGPhoneInputContext = createContext({} as PGPhoneInputContextType);

export function usePGPhoneInputContext() {
  return useContext(PGPhoneInputContext);
}

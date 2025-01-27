import { useMemo, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import labels from 'react-phone-number-input/locale/pt-BR';

import { Select } from 'antd';
import { clsx } from 'clsx';

import { SelectInputComponentProps } from '~/components/PGPhoneInput/SelectInputComponent/types';
import { SelectOption } from '~/types/antd';

import './styles.scss';

const filterSort = (a: SelectOption, b: SelectOption) =>
  String(a.textContent ?? '')
    .toLocaleLowerCase()
    .localeCompare(String(b.textContent ?? '').toLocaleLowerCase());

export function SelectInputComponent({
  iconComponent: IconComponent,
  ...props
}: SelectInputComponentProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const options: SelectOption[] = useMemo(
    () =>
      getCountries().map((country) => {
        const callingCode = getCountryCallingCode(country);
        const countryLabel = labels[country];
        const textContent = `${countryLabel} (+${callingCode})`;

        return {
          textContent,
          value: country,
          title: textContent,
          label: (
            <span className="pg-phone-input__option flex gap-2 items-center leading-none">
              {isDropdownVisible ? (
                <>
                  <span className="icon min-w-8 w-8 max-w-8 h-auto rounded-[4px] overflow-hidden">
                    <IconComponent country={country} label={countryLabel} />
                  </span>
                  <span className="country-label">{countryLabel} (</span>
                  <span className="calling-code">+{callingCode}</span>
                  <span className="country-label">)</span>
                </>
              ) : (
                `+${getCountryCallingCode(country)}`
              )}
            </span>
          ),
        } satisfies SelectOption;
      }),
    [IconComponent, isDropdownVisible]
  );

  return (
    <Select
      {...props}
      className={clsx('pg-phone-input__select', props.className)}
      filterSort={filterSort}
      onDropdownVisibleChange={setIsDropdownVisible}
      open={isDropdownVisible}
      optionFilterProp="textContent"
      options={options}
      popupMatchSelectWidth={256}
      showSearch
      style={{ width: 100 }}
    />
  );
}

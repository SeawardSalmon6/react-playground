import { ReactElement } from 'react';
import { Country } from 'react-phone-number-input';

import { SelectProps } from 'antd';

export type SelectInputComponentProps = SelectProps & {
  iconComponent: (props: { country?: Country; label: string }) => ReactElement;
};

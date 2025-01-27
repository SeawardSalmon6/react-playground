import { SelectProps } from 'antd';

import { GetArrayElementType } from '~/types/shared';

export type SelectOption = GetArrayElementType<NonNullable<SelectProps['options']>>;

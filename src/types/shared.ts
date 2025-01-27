import { Dispatch, SetStateAction } from 'react';

import dayjs from 'dayjs';

export type DayjsConstructorType = string | number | Date | dayjs.Dayjs | null | undefined;
export type GetArrayElementType<T> = T extends Array<infer U> ? U : T;

export type SetState<T> = Dispatch<SetStateAction<T>>;

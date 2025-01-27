import React from 'react';

export type InputMaskProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onKeyDown' | 'value' | 'type'
> & {
  mask: InputMaskPropType;
  value?: unknown;
  maskChar?: string | null;
  parser?: (context: InputMaskContextType) => unknown;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (
    value: unknown,
    context: InputMaskContextType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  maskChoicer?: (context: InputMaskContextType) => string;
};

export type InputMaskPropType = string | InputMaskConfigType | DynamicInputMaskType;
export type DynamicInputMaskType = { [key: string]: string | InputMaskConfigType };

export type InputMaskConfigType = {
  mask: string;
  rules: InputMaskKeyCharType;
};

export type InputMaskContextType = {
  masked: string;
  raw: string;
  parsed: unknown;
};

export const DEFAULT_MASK_KEY_CHARS: InputMaskKeyCharType = {
  DIGIT: {
    keyChar: '9',
    validator: (input: string) => !/[^\d]/.test(input),
  },
  ALPHA: {
    keyChar: 'A',
    validator: (input: string) => !/[^A-Za-z]/.test(input),
  },
  ALPHANUMERIC: {
    keyChar: '*',
    validator: (input: string) => !/[^A-Za-z\d]/.test(input),
  },
};

export type InputMaskKeyCharType = {
  [key: string]: InputMaskKeyCharValueType;
};

export type InputMaskKeyCharValueType = {
  keyChar: string;
  min?: number;
  max?: number;
  validator?: (input: string) => boolean;
  onlyNumbers?: boolean;
};

export type MaskGroupsType = {
  start: number;
  end: number;
} & InputMaskKeyCharValueType;

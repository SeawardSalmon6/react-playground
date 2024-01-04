import React, { useRef } from 'react';

import {
  createInputMaskContext,
  getCleanedValue,
  getMaskVariables,
  setContextMaskedBasedOnGroups,
  setContextMaskedUsingDefaultKeyChars,
  updateInputValueUsingMaskConfig,
} from './constants';
import { InputMaskProps } from './types';

export function InputMask({
  mask: maskConfig,
  onChange,
  onKeyDown,
  maskChar = '_',
  value,
  parser,
  ...props
}: InputMaskProps) {
  const inputValue = useRef<string | undefined>(value ? String(value) : undefined);
  const { isCustomMask, mask, maskGroups, onlyKeyCharsMask } = getMaskVariables(maskConfig);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const context = createInputMaskContext(inputValue.current);
    const value = inputValue.current ?? '';

    if (isCustomMask) {
      setContextMaskedBasedOnGroups({ context, value, maskGroups, maskChar, mask });
    } else {
      setContextMaskedUsingDefaultKeyChars({ context, value, maskChar, mask });
    }

    if (parser) {
      context.parsed = parser(context);
    }

    e.target.value = context.masked; // Updates the input value
    onChange?.(context.parsed, context, e); // Passes the context to the onChange callback
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const selectionLength =
        (e.currentTarget.selectionEnd ?? 0) - (e.currentTarget.selectionStart ?? 0);

      inputValue.current = getCleanedValue(
        inputValue.current?.slice(0, -(selectionLength || 1)),
        maskConfig
      );
    } else if (e.key.length === 1) {
      updateInputValueUsingMaskConfig({
        newKey: e.key,
        inputValue,
        maskConfig,
        maskGroups,
        isCustomMask,
        onlyKeyCharsMask,
      });
    }

    onKeyDown?.(e);
  };

  return <input {...props} type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} />;
}

import React, { useRef } from 'react';

import {
  createInputMaskContext,
  getCleanedValue,
  getMaskConfigInfo,
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
  maskChoicer,
  ...props
}: InputMaskProps) {
  const inputValue = useRef<string | undefined>(value ? String(value) : undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const context = createInputMaskContext(inputValue.current);
    const value = inputValue.current ?? '';
    const { isCustomMask, config, maskGroups, mask } = getMaskConfigInfo(
      maskConfig,
      maskChoicer,
      value
    );

    if (isCustomMask && config) {
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
      const updatedValue = inputValue.current?.slice(0, -(selectionLength || 1));
      const { config, isCustomMask, mask } = getMaskConfigInfo(
        maskConfig,
        maskChoicer,
        updatedValue
      );

      inputValue.current = getCleanedValue(updatedValue, isCustomMask && config ? config : mask);
    } else if (e.key.length === 1) {
      updateInputValueUsingMaskConfig({
        newKey: e.key,
        inputValue,
        maskConfig,
        maskChoicer,
      });
    }

    onKeyDown?.(e);
  };

  return (
    <input
      {...props}
      type="text"
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className={`input-mask input ${props.className ?? ''}`}
    />
  );
}

import React from 'react';

import { intoUniqueArray } from '~/utils/intoUniqueArray';

import {
  InputMaskConfigType,
  InputMaskContextType,
  InputMaskProps,
  MaskGroupsType,
  defaultMaskKeyChars,
} from './types';

const trimAndSliceString = (str: string | undefined, length: number) => {
  return str?.trim()?.slice(0, length) ?? '';
};

const getMaskSeparators = (mask: InputMaskProps['mask']) => {
  if (typeof mask === 'string') {
    return intoUniqueArray(mask.match(/[^9A*]/g)); // Get all separators based on default key chars
  }

  const { rules } = mask;
  const rulesKeyChars = intoUniqueArray(
    Object.values(rules).flatMap(({ keyChar }) => keyChar.split(''))
  );

  const regex = new RegExp(`[^${rulesKeyChars.join('')}]`, 'g');
  return intoUniqueArray(mask.mask.match(regex)); // Get all separators based on custom key chars
};

const isInputKeyValid = (char: string, testKeyChar: string) => {
  return Object.values(defaultMaskKeyChars).some(({ keyChar, validator }) => {
    const isSameKeyChar = keyChar === testKeyChar;
    const isCharValid = validator!(char);
    return isSameKeyChar && isCharValid;
  });
};

const removeNonKeyChars = (str: string | undefined, separators: string[]) => {
  return str ? str.replace(new RegExp(`[${separators.join('')}]`, 'g'), '') : ''; // Removes all separators from the input value
};

const getMaskGroups = (maskConfig: InputMaskConfigType, onlyKeyCharsMask: string) => {
  const rules = Object.values(maskConfig.rules);
  const groups: MaskGroupsType[] = [];

  let currentGroup = '';
  onlyKeyCharsMask.split('').forEach((char, index) => {
    const thereAreSomeRulesThatStartsWithCurrentGroup = rules.some((rule) =>
      rule.keyChar.startsWith(currentGroup || char)
    );

    if (thereAreSomeRulesThatStartsWithCurrentGroup) {
      const currentGroupRule = rules.find(({ keyChar }) => keyChar === currentGroup)!;
      if (currentGroupRule) {
        groups.push({
          start: index - currentGroup.length,
          end: index,
          ...currentGroupRule,
        });
        currentGroup = char;
      } else {
        currentGroup += char;
      }
    } else {
      throw new Error('Invalid mask');
    }
  });

  const currentGroupRule = rules.find(({ keyChar }) => keyChar === currentGroup)!;
  if (currentGroupRule) {
    groups.push({
      start: onlyKeyCharsMask.length - currentGroup.length,
      end: onlyKeyCharsMask.length,
      ...currentGroupRule,
    });
  } else {
    throw new Error('Invalid mask');
  }

  return groups;
};

const parseValueBasedOnGroup = (value: string | undefined, group: MaskGroupsType) => {
  const { keyChar, validator, min, max, start, end, onlyNumbers } = group;
  const testValue = value?.slice(start, end) ?? '';
  const parsedTestValue = parseInt(testValue, 10);
  let newGroupValue = testValue;

  if (onlyNumbers) {
    newGroupValue = testValue.replace(/\D/g, '');

    if (testValue.length === keyChar.length) {
      if (min && parsedTestValue < min) {
        newGroupValue = String(min).padStart(keyChar.length, '0');
      }

      if (max && parsedTestValue > max) {
        newGroupValue = String(max).padStart(keyChar.length, '0');
      }
    }
  }

  if (validator && !validator(newGroupValue)) {
    newGroupValue = testValue.slice(0, -1);
  }

  return (
    value
      ?.split('')
      ?.map((char, index) => (index >= start && index < end ? newGroupValue[index - start] : char))
      ?.join('') ?? ''
  );
};

export const getCleanedValue = (str: string | undefined, maskConfig: InputMaskProps['mask']) => {
  if (typeof maskConfig === 'string') {
    const maskRealLength = maskConfig.replace(/[^9A*]/g, '').length; // Gets the mask length without key chars
    return trimAndSliceString(str, maskRealLength);
  }

  const { rules, mask } = maskConfig;
  const rulesKeyChars = intoUniqueArray(
    Object.values(rules).flatMap(({ keyChar }) => keyChar.split(''))
  );

  const maskRealLength = mask.replace(new RegExp(`[^${rulesKeyChars.join('')}]`, 'g'), '').length;
  return trimAndSliceString(str, maskRealLength);
};

export const createInputMaskContext = (raw: string | undefined) => {
  return {
    masked: '',
    raw,
    parsed: raw,
  } as InputMaskContextType;
};

export const setContextMaskedBasedOnGroups = ({
  context,
  maskGroups,
  value,
  maskChar,
  mask,
}: {
  context: InputMaskContextType;
  maskGroups: MaskGroupsType[];
  value: string;
  maskChar: InputMaskProps['maskChar'];
  mask: string;
}) => {
  const updateCurrentGroupAndContext = (char: string, startingIndex?: number) => {
    const currentMaskGroup = maskGroups.find(
      ({ keyChar, start }) => start >= (startingIndex ?? 0) && keyChar === currentGroup
    );

    if (currentMaskGroup) {
      const groupValue = value.slice(currentMaskGroup.start, currentMaskGroup.end) ?? '';

      if (groupValue.length === 0) {
        // Group is empty, then add the group mask
        context.masked += maskChar?.repeat(currentMaskGroup.keyChar.length) ?? '';
      } else if (groupValue.length < currentMaskGroup.keyChar.length) {
        // Group is not complete, then add the group value and the rest of the group mask
        context.masked +=
          groupValue +
          (maskChar?.repeat(currentMaskGroup.keyChar.length - groupValue.length) ?? '');

        lastConsumedValueCharIndex += groupValue.length;
      } else if (groupValue.length === currentMaskGroup.keyChar.length) {
        // Group is complete, then add the group value
        context.masked += groupValue ?? '';
        lastConsumedValueCharIndex += groupValue.length;
      }

      currentGroup = '';
    } else {
      // Current group is not complete, then add char to current group
      currentGroup += char;
    }
  };

  const inputValueLength = value?.length ?? 0;
  let lastConsumedValueCharIndex = 0;
  let currentGroup = '';

  for (const char of mask) {
    if (!maskChar && lastConsumedValueCharIndex >= inputValueLength) {
      // No more value chars to consume and don't write rest of the mask on input
      break;
    }

    if (maskGroups.some(({ keyChar }) => keyChar.startsWith(char))) {
      // Char is a key char, then add it to current group
      updateCurrentGroupAndContext(char, lastConsumedValueCharIndex);
    } else {
      // Char is not a key char, then write the last group and add the separator
      updateCurrentGroupAndContext(char, lastConsumedValueCharIndex);
      context.masked += char;
    }
  }

  updateCurrentGroupAndContext('', lastConsumedValueCharIndex);
};

export const updateInputValueUsingMaskConfig = ({
  isCustomMask,
  inputValue,
  maskGroups,
  maskConfig,
  newKey,
  onlyKeyCharsMask,
}: {
  isCustomMask: boolean;
  inputValue: React.MutableRefObject<string | undefined>;
  maskGroups: MaskGroupsType[];
  maskConfig: InputMaskProps['mask'];
  newKey: string;
  onlyKeyCharsMask: string;
}) => {
  const currentMaskCharIndex = inputValue.current ? inputValue.current.length : 0;
  const currentMaskChar = onlyKeyCharsMask[currentMaskCharIndex];

  if (isCustomMask) {
    const currentMaskGroup = maskGroups.find(
      ({ start, end }) => currentMaskCharIndex >= start && currentMaskCharIndex < end
    );

    if (currentMaskGroup) {
      const cleanedValue = getCleanedValue((inputValue.current ?? '') + newKey, maskConfig);
      inputValue.current = parseValueBasedOnGroup(cleanedValue, currentMaskGroup);
    }
  } else {
    if (isInputKeyValid(newKey, currentMaskChar)) {
      inputValue.current = getCleanedValue((inputValue.current ?? '') + newKey, maskConfig);
    }
  }
};

export const setContextMaskedUsingDefaultKeyChars = ({
  mask,
  value,
  maskChar,
  context,
}: {
  mask: string;
  value: string;
  maskChar: InputMaskProps['maskChar'];
  context: InputMaskContextType;
}) => {
  let lastConsumedValueCharIndex = 0;
  const inputValueLength = value.length;

  for (const char of mask) {
    if (!maskChar && lastConsumedValueCharIndex >= inputValueLength) {
      // No more value chars to consume and don't write rest of the mask on input
      break;
    }

    if (Object.values(defaultMaskKeyChars).some(({ keyChar }) => keyChar === char)) {
      context.masked += value[lastConsumedValueCharIndex] ?? maskChar ?? ''; // Insert the value char or the maskChar
      lastConsumedValueCharIndex += 1;
    } else {
      // Char is not a key char, then add separator
      context.masked += char;
    }
  }
};

export const getMaskVariables = (maskConfig: InputMaskProps['mask']) => {
  const isCustomMask = typeof maskConfig !== 'string';
  const mask = isCustomMask ? (maskConfig as InputMaskConfigType).mask : maskConfig;
  const onlyKeyCharsMask = removeNonKeyChars(mask, getMaskSeparators(maskConfig));
  const maskGroups = isCustomMask ? getMaskGroups(maskConfig, onlyKeyCharsMask) : [];

  return { isCustomMask, mask, onlyKeyCharsMask, maskGroups };
};

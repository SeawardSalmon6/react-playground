import { PropsWithChildren, ReactNode } from 'react';

export type PGHeaderProps = {
  title: ReactNode;
  tabTitle?: string;
  navigation?: {
    backTo?: string;
    onClick?: () => void;
  };
  level?: PGHeaderLevelProp;
} & PropsWithChildren;

export type PGHeaderLevelProp = 1 | 2 | 3 | 4 | 5 | 6;

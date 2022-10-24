import React from 'react';

import className from 'classnames';

import { LevelEnum } from '../../../../enums/LevelEnum';

export interface BadgeProps {
  number: number;
  level?: LevelEnum;
}

export function Badge({ number, level }: BadgeProps) {
  return <span className={className('badge', [`badge--${level}`])}>{number}</span>;
}

Badge.defaultProps = {
  level: LevelEnum.PRIMARY,
};

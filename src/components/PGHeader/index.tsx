import { useEffect } from 'react';
import { MdArrowCircleLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_SUFFIX, getHeader } from '~/components/PGHeader/constants';
import { PGHeaderProps } from '~/components/PGHeader/types';

export function PGHeader({ title, tabTitle, navigation, level, children }: PGHeaderProps) {
  const navigate = useNavigate();
  const { backTo, onClick } = navigation ?? {};
  const isTitleString = typeof title === 'string';

  useEffect(() => {
    document.title = isTitleString
      ? `${tabTitle ?? title} | ${DEFAULT_SUFFIX}`
      : `${tabTitle} | ${DEFAULT_SUFFIX}`;

    return () => {
      document.title = DEFAULT_SUFFIX;
    };
  }, [isTitleString, tabTitle, title]);

  const handleNavigationButtonClick = () => {
    onClick?.();

    if (backTo) {
      navigate(backTo);
    }
  };

  return (
    <header className="text-4xl font-bold flex gap-4 align-items">
      <div className="flex items-center justify-start gap-3">
        {navigation && (
          <button onClick={handleNavigationButtonClick} type="button">
            <MdArrowCircleLeft className="block align-middle" />
          </button>
        )}
        {getHeader({ level, title })}
      </div>
      {children}
    </header>
  );
}

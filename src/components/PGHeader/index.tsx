import { useEffect } from 'react';
import { MdArrowCircleLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type PGHeaderProps = {
  title: string;
  tabTitle?: string;
  navigation?: {
    backTo?: string;
    onClick?: () => void;
  };
};

const DEFAULT_SUFFIX = 'React Playground';

export function PGHeader({ title, tabTitle, navigation }: PGHeaderProps) {
  const navigate = useNavigate();
  const { backTo, onClick } = navigation ?? {};

  const handleNavigationButtonClick = () => {
    onClick?.();

    if (backTo) {
      navigate(backTo);
    }
  };

  useEffect(() => {
    document.title = `${tabTitle ?? title} | ${DEFAULT_SUFFIX}`;

    return () => {
      document.title = DEFAULT_SUFFIX;
    };
  }, [tabTitle, title]);

  return (
    <h1 className="text-4xl font-bold flex gap-4 align-items">
      {navigation && (
        <button type="button" onClick={handleNavigationButtonClick}>
          <MdArrowCircleLeft className="block align-middle" />
        </button>
      )}
      {title}
    </h1>
  );
}

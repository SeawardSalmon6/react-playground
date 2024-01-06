import { useState } from 'react';

export function useJSONViewer() {
  const [context, setContext] = useState('');

  const setJSON = (value: unknown) => {
    setContext(JSON.stringify(value, null, 2));
  };

  return [context, setJSON] as const;
}

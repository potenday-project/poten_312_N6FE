import { useState } from 'react';

export const useCheckbox = (initialValue?: boolean) => {
  const [checked, setChecked] = useState(initialValue ?? false);

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  const reset = () => setChecked(false);

  return { checked, onChange, reset, setChecked };
};

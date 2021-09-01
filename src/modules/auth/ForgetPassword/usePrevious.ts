import React from 'react';

/**
 * Custom hook that can use to keep previous value and useful for prop comparison
 * @param value The object/value to want to remember
 * @returns The previous object/value
 */
const usePrevious = <T>(value: T) => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  React.useDebugValue(ref.current);

  return ref.current;
};

export default usePrevious;

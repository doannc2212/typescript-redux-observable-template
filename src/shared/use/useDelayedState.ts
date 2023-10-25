import React from 'react';

export default function useDelayedState<T = unknown>(
  initialState: T,
  condition: boolean,
): [T | null, (newState: T) => void] {
  const [{ state, loaded }, setState] = React.useState<{ state: T | null; loaded: boolean }>({
    state: null,
    loaded: false,
  });

  React.useEffect(() => {
    if (!loaded && condition) setState({ state: initialState, loaded: true });
  }, [condition, initialState, loaded]);

  const updateState = (newState: T) => {
    if (!loaded) return;
    setState({ state: newState, loaded });
  };

  return [state, updateState];
}

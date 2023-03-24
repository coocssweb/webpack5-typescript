import { useCallback, useState } from 'react';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

const useSetState = <S extends Record<string, any>>(initalState: S | (() => S)): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initalState);

  const setMergeState = useCallback((patch: any) => {
    setState((prevState) => {
      const patchValue = patch instanceof Function ? patch(prevState) : patch;
      return { ...prevState, ...patchValue };
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;

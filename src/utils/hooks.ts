import { useCallback, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((st) => !st), []);

  return [state, toggle];
};

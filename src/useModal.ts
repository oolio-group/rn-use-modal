import { useContext } from 'react';
import { ModalContext, ModalContextValue } from './Modal';

export function useModal(): ModalContextValue {
  return useContext(ModalContext);
}

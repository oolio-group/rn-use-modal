import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import ModalComponent, { ModalProps } from 'react-native-modal';

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
  },
});

export interface ModalProviderProps {
  children: React.ReactNode;
  modalProps?: Partial<ModalProps>;
}

export interface ModalContextValue {
  showModal: (content: React.ReactNode, options?: Partial<ModalProps>) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue>(
  {} as ModalContextValue,
);

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  modalProps,
}: ModalProviderProps) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const optionsRef = useRef<Partial<ModalProps>>({});

  const showModal = useCallback(
    (content: React.ReactNode, options?: Partial<ModalProps>) => {
      setContent(content);
      optionsRef.current = options;
    },
    [],
  );

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  const value = useMemo(
    () => ({ showModal, closeModal }),
    [showModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalComponent
        {...modalProps}
        {...(optionsRef.current || {})}
        isVisible={content !== null}
        useNativeDriver
        hideModalContentWhileAnimating
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        style={[styles.modalStyle, modalProps.style]}
      >
        {content}
      </ModalComponent>
    </ModalContext.Provider>
  );
};

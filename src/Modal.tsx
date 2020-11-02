import React, { createContext, useCallback, useMemo, useState } from 'react';
import { Modal as ModalComponent, ModalProps, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    height: '100%',
    marginLeft: 0,
    margin: 0,
  },
});

export interface Modal {
  content: React.ReactNode;
  options?: Partial<ModalProps>;
}

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
  const [modal, setModal] = useState<Modal | null>(null);
  const showModal = useCallback(
    (content: React.ReactNode, options?: Partial<ModalProps>) => {
      setModal({
        content,
        options,
      });
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(() => ({ showModal, closeModal }), [
    showModal,
    closeModal,
  ]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ModalComponent
        {...modalProps}
        {...(modal?.options || {})}
        visible={modal !== null}
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
        style={styles.modalStyle}
      >
        {modal?.content}
      </ModalComponent>
    </ModalContext.Provider>
  );
};

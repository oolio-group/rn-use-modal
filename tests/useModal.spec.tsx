import React from 'react';
import { create } from 'react-test-renderer';
import { ModalProvider } from '../src/Modal';
import { useModal } from '../src/useModal';

describe('useModal', () => {
  test('context value returned', () => {
    const spy = jest.fn();
    const TestConsumer: React.FC = () => {
      const value = useModal();
      spy(value);
      return null;
    };

    create(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    const value = spy.mock.calls[0][0];
    expect(typeof value.showModal).toBe('function');
    expect(typeof value.closeModal).toBe('function');
  });
});

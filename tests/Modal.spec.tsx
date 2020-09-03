import React, { useContext, useEffect } from 'react';
import { Text } from 'react-native';
import { create, act } from 'react-test-renderer';
import { ModalContext, ModalProvider } from '../src/Modal';

jest.useFakeTimers();

describe('Modal Provider', () => {
  test('renders ok', () => {
    const wrapper = create(
      <ModalProvider>
        <Text>Hello World</Text>
      </ModalProvider>,
    );

    expect(wrapper.root.findByType(Text).props.children).toBe('Hello World');
  });

  test('provider value', () => {
    const contextSpy = jest.fn();
    const TestConsumer: React.FC = () => {
      const context = useContext(ModalContext);
      contextSpy(context);
      return <Text>Hello World</Text>;
    };

    create(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    expect(contextSpy.mock.calls[0][0]).toHaveProperty('showModal');
    expect(contextSpy.mock.calls[0][0]).toHaveProperty('closeModal');
  });

  test('showModal', () => {
    const TestConsumer: React.FC = () => {
      const { showModal } = useContext(ModalContext);

      useEffect(() => {
        showModal(<Text>Hello World</Text>);
      }, [showModal]);
      return null;
    };

    let wrapper;

    act(() => {
      wrapper = create(
        <ModalProvider>
          <TestConsumer />
        </ModalProvider>,
      );
    });

    expect(wrapper.root.findByType(Text).props.children).toBe('Hello World');
  });

  test('closeModal', () => {
    const TestConsumer: React.FC = () => {
      const { showModal, closeModal } = useContext(ModalContext);

      useEffect(() => {
        showModal(<Text>Hello World</Text>);
        closeModal();
      }, [closeModal, showModal]);
      return <Text>Modal Closed</Text>;
    };

    let wrapper;

    act(() => {
      wrapper = create(
        <ModalProvider>
          <TestConsumer />
        </ModalProvider>,
      );
    });

    expect(wrapper.root.findByType(Text).props.children).toBe('Modal Closed');
  });
});

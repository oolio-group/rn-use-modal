import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { create, act } from 'react-test-renderer';
import { ModalContext, ModalProvider } from '../src/Modal';
import { waitForPaint } from './testhelper';

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

  test('showModal with options', async () => {
    const onModalHideMock = jest.fn();
    const TestConsumer: React.FC = () => {
      const { showModal, closeModal } = useContext(ModalContext);
      const onShowModal = () => {
        showModal(<Text testID="modal-content">Hello World</Text>, {
          onModalHide: onModalHideMock,
        });
      };

      const onCloseModal = () => {
        closeModal();
      };
      return (
        <View>
          <TouchableOpacity testID="show-modal" onPress={onShowModal}>
            <Text>Show Modal</Text>
          </TouchableOpacity>

          <TouchableOpacity testID="close-modal" onPress={onCloseModal}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      );
    };

    const wrapper = create(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );
    await waitForPaint();

    const { onPress: onShowModal } = wrapper.root.findByProps({
      testID: 'show-modal',
    })?.props;
    act(() => {
      onShowModal();
    });

    await waitForPaint();

    expect(
      wrapper.root.findAllByProps({
        testID: 'modal-content',
      }),
    ).toHaveLength(2);

    const { onPress: onCloseModal } = wrapper.root.findByProps({
      testID: 'close-modal',
    })?.props;
    act(() => {
      onCloseModal();
    });

    await waitForPaint();

    expect(
      wrapper.root.findAllByProps({
        testID: 'modal-content',
      }),
    ).toHaveLength(0);

    expect(onModalHideMock).toHaveBeenCalled();
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

# @oolio-group/rn-use-modal

React hook for showing modals on react-native. Uses `react-native-modal` under the hood. Show any component as modal with `showModal`

[![codecov](https://codecov.io/gh/oolio-group/rn-use-modal/branch/master/graph/badge.svg?token=PINPV73BX8)](https://codecov.io/gh/oolio-group/rn-use-modal) [![npm](https://img.shields.io/npm/v/@oolio-group/rn-use-modal/latest.svg)](https://www.npmjs.com/package/@oolio-group/rn-use-modal) ![Build](https://github.com/oolio-group/rn-use-modal/workflows/Unit%20Tests%20and%20ESLint/badge.svg)

## Why

- Following recent trends `useModal` fits right in
- There are some libraries already, but few of them allows dynamic content for modals.

## Usage

```js
import { useModal } from '@oolio-group/rn-use-modal';

function ScreenWithModal() {
  const { showModal, closeModal } = useModal();

  const onConfirm = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const showConfirmation = useCallback(() => {
    showModal(<ConfirmationModal onConfirm={onConfirm} />);
  }, [showModal]);

  return <Pressable onPress={showConfirmation}>Confirm Me</Pressable>;
}
```

## ModalProvider

You need to wrap your screen with `ModalProvider` first for `useModal` to work.

```js
function App() {
  return (
    <ModalProvider modalProps={options}>
      <ScreenWithModal />
    </ModalProvider>
  );
}
```

For a list of options [see this page](https://github.com/react-native-community/react-native-modal#available-props)

## Caveats

This module currently uses `react-native-modal` under the hood. Considering life cycle of open source libraries it would be bettor to implement `Modal` from `react-native` directly.
`react-native-modal` was chosen as of now to support web platforms also. This can be done by aliasing `react-native-modal` with `modal-enhanced-react-native-web`

## Development

### Build

Build all projects `yarn build`
Clean build output `yarn clean`

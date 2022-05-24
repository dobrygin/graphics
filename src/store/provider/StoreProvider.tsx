import * as React from 'react';

import { configure } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

import Store from '../index';

configure({
  enforceActions: 'always',
  // computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  // observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

// in the browser
enableStaticRendering(typeof window === 'undefined');

let store: Store;

const StoreContext = React.createContext<Store | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

const useStore = (): Store => {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within RootStoreProvider!');
  }

  return context;
};

function initializeStore(initialData?: {}): Store {
  const _store = store ?? new Store();

  // if (initialData) {
  //   _store.hydrate(initialData);
  // }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

interface RootStoreProviderProps {
  // children: React.ReactNode;
  // hydrationData?: RootStoreHydration;
}

const StoreProvider = ({ children }): JSX.Element => {
  const store = initializeStore();

  // @ts-ignore
  window.store = store;

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export { useStore, StoreProvider };

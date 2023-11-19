'use client';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

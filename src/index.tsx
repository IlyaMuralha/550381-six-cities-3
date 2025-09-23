import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app';
import { reviewsMocks } from './mocks/reviews-mocks';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviewsMocks}/>
    </Provider>
  </React.StrictMode>
);

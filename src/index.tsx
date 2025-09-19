import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { OfferMocks } from './mocks/offer-mocks';
import { reviewsMocks } from './mocks/reviews-mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OfferMocks} reviews={reviewsMocks}/>
  </React.StrictMode>
);

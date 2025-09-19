import { useState } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import Layout from './layout/layout';
import { TOffer } from './components/offer-card/types';
import { TReview } from './components/review/types';

type AppScreenProps = {
  offers: TOffer[];
  reviews: TReview[];
}

function App({offers, reviews}: AppScreenProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<TOffer | undefined>(undefined);

  const handleOfferHover = (offer?: TOffer) => {
    setActiveOffer(offer);
  };

  const authorizationStatus = AuthorizationStatus.Auth;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout/>}
        >
          <Route index element={
            <MainScreen
              offers={offers}
              handleHover={handleOfferHover}
              activeOffer={activeOffer}
            />
          }
          />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={
            <OfferScreen
              offers={offers}
              authorizationStatus={authorizationStatus}
              reviews={reviews}
            />
          }
          />
          <Route path='*' element={<NotFoundScreen/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

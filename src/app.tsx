import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import Layout from './layout/layout';
import { TReview } from './components/review/types';
import { useAppSelector } from './hooks/store';
import Loader from './pages/loading-screen/loading-screen';

type AppScreenProps = {
  reviews: TReview[];
}

function App({reviews}: AppScreenProps): JSX.Element {

  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (isOffersDataLoading) {
    return (
      <Loader/>
    );
  }

  const authorizationStatus = AuthorizationStatus.Auth;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout/>}
        >
          <Route index element={
            <MainScreen />
          }
          />
          <Route path={AppRoute.Login} element={<LoginScreen/>} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={
            <OfferScreen
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

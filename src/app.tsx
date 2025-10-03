import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import Layout from './layout/layout';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { getToken } from './services/token';
import { useEffect } from 'react';
import { checkAuth } from './store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.user.status);
  const token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [token]);

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

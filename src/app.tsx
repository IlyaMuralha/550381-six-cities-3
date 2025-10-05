import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import ProtectedRoute from './components/private-route/private-route';
import Layout from './layout/layout';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { getToken } from './services/token';
import { useEffect } from 'react';
import { checkAuth } from './store/api-actions';
import { userSelectors } from './store/slices/user';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(userSelectors.authorizationStatus);
  const token = getToken();
  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [token, dispatch]);

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
          <Route
            path={AppRoute.Login}
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginScreen/>
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute>
                <FavoritesScreen />
              </ProtectedRoute>
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
